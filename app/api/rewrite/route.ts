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

  OUTPUT FORMAT — follow exactly:
  - name: person's name as-is (title case, not uppercase)
  - contact: keep all original links/values unchanged
  - education: institution + degree on one line, date range separate
  - skills: grouped by category (Languages, Frameworks, Databases etc.)
    each category has a label and array of items
  - projects: each has name, type ("Personal Project" / "Client Project"),
    and 3-5 strong action-verb bullet points
  - achievements: flat array of bullet strings

  RULES:
  - Do NOT fabricate experience, companies, or certifications
  - Incorporate missing keywords naturally into project bullets
  - Keep bullet points concise, action-verb led (Built, Architected, Designed)
  - Preserve original structure — only rewrite/strengthen the content

  Missing keywords: ${missingKeywordsArray.join(", ")}
  Job Description: ${jobDescription}
  Original Resume: ${resumeText}
`,
  });

  return Response.json(output);
}