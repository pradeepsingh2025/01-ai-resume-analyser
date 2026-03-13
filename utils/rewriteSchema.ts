import { z } from "zod"

export const rewriteSchema = z.object({
  name: z.string(),
  contact: z.object({
    email: z.string().optional(),
    phone: z.string().optional(),
    linkedin: z.string().optional(),
    github: z.string().optional(),
    location: z.string().optional(),
    website: z.string().optional(),
    portfolio: z.string().optional(),
    leetcode: z.string().optional(),
    hackerrank: z.string().optional(),
    codechef: z.string().optional(),
    codeforces: z.string().optional(),
  }).optional(),

  // Fixed sections you always want if present
  summary: z.string().optional(),
  skills: z.array(z.string()).optional(),

  // Dynamic — LLM decides section names and content
  sections: z.array(z.object({
    title: z.string(),          // "Experience", "Projects", "Certifications" etc
    type: z.enum(["bullets", "entries", "list", "paragraph"]),
    entries: z.array(z.object({
      heading: z.string().optional(),      // "Software Engineer @ Google"
      subheading: z.string().optional(),   // "2022 - Present"
      bullets: z.array(z.string()).optional(),
      paragraph: z.string().optional(),
    })),
  })),

  changesExplained: z.array(z.string()),
});