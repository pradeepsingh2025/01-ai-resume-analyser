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

    education: z.array(z.object({
        institution: z.string(),
        degree: z.string(),
        duration: z.string(),
        coursework: z.string().optional(),
    })),

    skills: z.array(z.object({
        label: z.string(),    // "Languages", "Frameworks and Libraries"
        items: z.array(z.string()),
    })),

    // Fixed sections you always want if present
    summary: z.string().optional(),

    projects: z.array(z.object({
        name: z.string(),
        type: z.string(),     // "Personal Project" | "Client Project"
        bullets: z.array(z.string()),
    })),
    achievements: z.array(z.object({
        text: z.string(),
    })),

    changesExplained: z.array(z.string()),
});