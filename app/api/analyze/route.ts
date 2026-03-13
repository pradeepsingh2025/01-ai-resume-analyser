import { generateText, Output } from "ai";
import { google } from "@ai-sdk/google";
import { auth } from "@clerk/nextjs/server";
import { analyseSchema } from "@/utils/analyseSchema";

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) return new Response("Unauthorized", { status: 401 });

  const { resumeText, jobDescription } = await req.json();

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

      Job Description:
      ${jobDescription}

      Resume:
      ${resumeText}
    `,
  });

  return Response.json(output);
}