// app/api/rewrite/route.ts
import { generateText, Output } from "ai";
import { google } from "@ai-sdk/google";
import { rewriteSchema } from "@/utils/rewriteSchema";
import { auth } from "@clerk/nextjs/server";

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) return new Response("Unauthorized", { status: 401 });

  const { resumeText, jobDescription, missingKeywords } = await req.json();
  console.log("missingKeywords", missingKeywords);

  console.log("jobDes", jobDescription);
  console.log("resume Text", resumeText);

  let missingKeywordsArray: string[] = [];
  if (typeof missingKeywords === "string" && missingKeywords.trim()) {
    try {
      const parsed = JSON.parse(missingKeywords);
      missingKeywordsArray = Array.isArray(parsed) ? parsed : [parsed];
    } catch {
      // Not valid JSON — treat as comma-separated string
      missingKeywordsArray = missingKeywords.split(",").map((k: string) => k.trim()).filter(Boolean);
    }
  } else if (Array.isArray(missingKeywords)) {
    missingKeywordsArray = missingKeywords;
  }
  console.log("missing keywords array",missingKeywordsArray)

  const { output } = await generateText({
    model: google("gemini-2.5-flash"),
    output: Output.object({
      schema: rewriteSchema,
    }),
    prompt: `
You are an expert resume writer. Rewrite the resume below to best match the job description.

═══════════════════════════════
SECTION-BY-SECTION RULES
═══════════════════════════════

SUMMARY (optional, 2-4 sentences max):
- Lead with years of experience + top strength
- Tie directly to what the employer needs
- Skip if there is nothing sharp and specific to say
- Never use generic phrases like "hard worker" or "team player"

SKILLS:
- List 5-10 skills total per category — no filler
- Use EXACT terminology from the job description (e.g. "AWS" not "cloud")
- Group by category: Languages | Frameworks | Databases | Tools | etc.
- Put the most job-relevant categories first
- Drop any skill not relevant to this specific role

EXPERIENCE (the most important section skip if not applicable(freshers)):
- Reverse chronological order
- 3-6 bullets per role, fewer for older/less relevant jobs
- Every bullet = Action Verb + Context + Measurable Result
  ✓ "Reduced API latency by 40% by migrating to Redis-based caching"
  ✗ "Responsible for backend APIs"
- Quantify everything possible: %, $, time saved, users served, team size
- Use past tense for previous roles, present tense for current
- Naturally incorporate missing keywords into bullets — never stuff

PROJECTS (2-4 max, early-career focus):
- Only include projects relevant to this role
- List tech stack used
- Each bullet = Action + What you built + Outcome with a number
- Include links only as supplementary — bullets must be self-contained

ACHIEVEMENTS:
- Flat list of standout wins: awards, recognitions, competition results
- Each must have a number or verifiable proof
- Remove anything generic or unverifiable

═══════════════════════════════
ABSOLUTE RULES
═══════════════════════════════
- DO NOT fabricate companies, job titles, dates, or certifications
- DO NOT copy sentences verbatim from the job description
- DO NOT use weak openers: "responsible for", "worked on", "helped with"
- DO NOT pad skills — quality over quantity
- Preserve all original contact info, dates, and institution names exactly
- Incorporate missing keywords NATURALLY into existing bullets/summary
- Every bullet must start with a strong action verb: Built, Architected, Reduced, Led, Launched, etc.

Missing keywords to weave in: ${missingKeywordsArray.join(", ")}
Job Description: ${jobDescription}
Original Resume: ${resumeText}
    `,
  });

  return Response.json(output);

}
