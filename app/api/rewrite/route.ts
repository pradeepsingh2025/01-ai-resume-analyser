// app/api/rewrite/route.ts
import { generateText, Output } from "ai";
import { google } from "@ai-sdk/google";
import { rewriteSchema } from "@/utils/rewriteSchema";
import { auth } from "@clerk/nextjs/server";

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) return new Response("Unauthorized", { status: 401 });

  const { resumeText, jobDescription, missingKeywords } = await req.json();
  const missingKeywordsArray = JSON.parse(missingKeywords);

  const { output } = await generateText({
    model: google("gemini-2.5-flash"),
    output: Output.object({
      schema: rewriteSchema,
    }),
    prompt: `
  Rewrite this resume to better match the job description.
  
  IMPORTANT RULES:
  - Only include sections that exist in the original resume
  - Do NOT add sections like "Experience" if the person has none
  - Do NOT fabricate companies, roles, degrees or certifications
  - Preserve the resume type (fresher/experienced/academic)
  - For each section, pick the most appropriate type:
    * "entries" for experience, education, projects (has heading + bullets)
    * "list" for skills, certifications, languages
    * "paragraph" for summary, objective
    * "bullets" for achievements, activities

  Job Description: ${jobDescription}
  Original Resume: ${resumeText}
  Missing Keywords to incorporate naturally: ${missingKeywordsArray.join(", ")}
`,
  });

  return Response.json(output);
}