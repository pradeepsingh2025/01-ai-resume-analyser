// utils/rewriteSchema.ts
import { z } from "zod";

const bulletString = z
    .string()
    .describe("Action verb + context + measurable result. No weak openers.");

export const rewriteSchema = z.object({
    name: z.string().describe("Full name in title case, unchanged from original"),

    contact: z
        .object({
            email: z.string().optional(),
            phone: z.string().optional(),
            linkedin: z.string().optional(),
            github: z.string().optional(),
            location: z.string().optional(), // City + State/Country only, no street address
            website: z.string().optional(),
            portfolio: z.string().optional(),
            leetcode: z.string().optional(),
            hackerrank: z.string().optional(),
            codechef: z.string().optional(),
            codeforces: z.string().optional(),
        })
        .optional()
        .describe("Keep all values exactly as in original — do not modify links"),

    summary: z
        .string()
        .optional()
        .describe(
            "2–4 sentences: years of experience + top strength + what you offer this employer. Omit if nothing sharp to say."
        ),

    skills: z
        .array(
            z.object({
                label: z.string().describe("Category name e.g. Languages, Frameworks, Databases, Tools, Cloud"),
                items: z
                    .array(z.string())
                    .min(1)
                    .max(10)
                    .describe("5–10 items max per category, exact terminology from job description"),
            })
        )
        .describe("Most job-relevant categories listed first. No filler skills."),

    // ✅ NEW — core section was missing entirely
    experience: z
        .array(
            z.object({
                company: z.string(),
                location: z.string().optional(),
                title: z.string(),
                duration: z.string().describe("e.g. Jan 2023 – Present"),
                bullets: z
                    .array(bulletString)
                    .min(2)
                    .max(6)
                    .describe("3–6 bullets for recent roles, fewer for older ones"),
            })
        )
        .optional()
        .describe("Reverse chronological. Core section — preserve all real companies and dates."),

    education: z.array(
        z.object({
            institution: z.string(),
            degree: z.string(),
            duration: z.string(),
            gpa: z.string().optional().describe("Include only if 3.5+ and early-career"),
            coursework: z.string().optional().describe("Only if directly relevant to the role"),
        })
    ),

    projects: z
        .array(
            z.object({
                name: z.string(),
                type: z.string().describe('"Personal Project" | "Client Project" | "Open Source"'),
                techStack: z
                    .array(z.string())
                    .describe("Technologies, languages, frameworks used — improves ATS keyword match"),
                bullets: z
                    .array(bulletString)
                    .min(2)
                    .max(5)
                    .describe("Action + what was built + measurable outcome"),
                link: z.string().optional().describe("GitHub / live demo URL if available"),
            })
        )
        .max(4)
        .describe("2–4 most relevant projects only. Quality over quantity."),

    achievements: z
        .array(z.string()) // ✅ Fixed — was incorrectly {text: string}[]
        .describe("Awards, rankings, recognitions — each must include a number or verifiable proof"),

    changesExplained: z
        .array(z.string())
        .describe("List of specific changes made and why — for showing the user what was improved"),
});