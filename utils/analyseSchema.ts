import { z } from "zod"

export const analyseSchema = z.object({
  atsScore: z.number().min(0).max(100),
  missingKeywords: z.array(z.string()),
  strengths: z.array(z.string()),
  weaknesses: z.array(z.string()),
  overallFeedback: z.string(),
});