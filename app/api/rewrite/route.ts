// app/api/rewrite/route.ts
import { generateText, Output } from "ai";
import { google } from "@ai-sdk/google";
import { z } from "zod";
import { auth } from "@clerk/nextjs/server";

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) return new Response("Unauthorized", { status: 401 });

  const { resumeText, jobDescription, missingKeywords } = await req.json();

  const { output } = await generateText({
    model: google("gemini-2.0-flash"),
    output: Output.object({
      schema: z.object({
        rewrittenResume: z.string(),
        changesExplained: z.array(z.string()),
      }),
    }),
    prompt: `
      Rewrite this resume to better match the job description.
      Naturally incorporate these missing keywords: ${missingKeywords.join(", ")}
      Keep the candidate's voice and don't fabricate experience.

      Job Description: ${jobDescription}
      Resume: ${resumeText}
    `,
  });

  return Response.json(output);
}