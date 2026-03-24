import { generateText, Output } from "ai";
import { google } from "@ai-sdk/google";
import { auth, currentUser } from "@clerk/nextjs/server";
import { analyseSchema } from "@/utils/analyseSchema";
import prismaClient from "@/lib/prisma";

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const user = await prismaClient.user.findUnique({
    where: { id: userId },
  });

  if (!user) return Response.json({ error: "User not found" }, { status: 404 });

  if (user.analysesCount >= 10) {
    return Response.json({ error: "You have reached the maximum number of analyses. Please upgrade to continue." }, { status: 403 });
  }

  // Ensure the user exists in the database before creating related records
  const clerkUser = await currentUser();
  await prismaClient.user.upsert({
    where: { id: userId },
    update: {},
    create: {
      id: userId,
      name: clerkUser?.fullName ?? clerkUser?.firstName ?? "Unknown",
      email: clerkUser?.emailAddresses[0]?.emailAddress ?? "",
    },
  });

  const { resumeText, jobDescription } = await req.json();

  const { id: jobDescriptionId } = await prismaClient.jobDescription.create({
    data: {
      content: jobDescription,
      userId,
    },
  });

  const { id: resumeTextId } = await prismaClient.resumeText.create({
    data: {
      content: resumeText,
      userId,
    },
  });

  const { output } = await generateText({
    model: google("gemini-2.5-flash"),
    output: Output.object({ schema: analyseSchema }),
    prompt: `
      You are an expert ATS resume analyzer.

      Analyze the resume against the job description and return:
      - atsScore: 0-100 compatibility score
      - missingKeywords: important keywords from JD missing in resume
      - strengths: what the resume does well for this role
      - weaknesses: gaps or weak areas
      - overallFeedback: 2-3 sentence summary

      IMPORTANT — The resume text may contain an "--- EMBEDDED LINKS ---" section
      at the end. These are hyperlinks that were hidden behind clickable text in the
      original document (e.g. "LinkedIn" linking to a profile URL, project names
      linking to GitHub repos or live demos). Use them as follows:
      - Identify LinkedIn, GitHub, portfolio, and project URLs.
      - If the JD asks for a portfolio, GitHub profile, or online presence, check
        whether matching links are present and factor that into the score.
      - Mention noteworthy links (e.g. relevant GitHub repos, live project demos)
        in strengths if they strengthen the candidacy.
      - If key links are missing (e.g. no LinkedIn when JD expects it, no project
        URLs for claimed projects), flag them in weaknesses.
      - Reference specific URLs in overallFeedback when they add context.

      Job Description:
      ${jobDescription}

      Resume:
      ${resumeText}
    `,
  });



  const { id: analysisId } = await prismaClient.analysis.create({
    data: {
      atsScore: output.atsScore,
      missingKeywords: output.missingKeywords,
      strengths: output.strengths,
      weaknesses: output.weaknesses,
      overallFeedback: output.overallFeedback,
      userId,
      jobDescriptionId,
      resumeTextId,
    },
  });

  await prismaClient.user.update({
    where: { id: userId },
    data: {
      analysesCount: { increment: 1 },
    },
  });

  return Response.json({ analysisId, output });
}


