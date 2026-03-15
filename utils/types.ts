// types/resume.ts

// ─── Primitive / Shared ───────────────────────────────────────────────────────

export type SectionType = "bullets" | "entries" | "list" | "paragraph";

export type ProjectType = "Personal Project" | "Client Project" | "Open Source";

// ─── Contact ──────────────────────────────────────────────────────────────────

export interface ContactInfo {
  email?: string;
  phone?: string;
  location?: string;       // City + State/Country only — no street address
  linkedin?: string;
  github?: string;
  website?: string;
  portfolio?: string;
  // Competitive programming platforms
  leetcode?: string;
  hackerrank?: string;
  codechef?: string;
  codeforces?: string;
}

// ─── Summary ─────────────────────────────────────────────────────────────────
// 2–4 sentences: years of experience + top strength + value to employer
// Omit entirely if nothing sharp and specific to say

export type SummarySection = string;

// ─── Skills ───────────────────────────────────────────────────────────────────
// 5–10 items per category, exact terminology from job description
// Most job-relevant categories listed first

export interface SkillCategory {
  label: string;    // "Languages" | "Frameworks" | "Databases" | "Tools" | "Cloud"
  items: string[];  // ["TypeScript", "Python", ...] — no filler, no generic buzzwords
}

// ─── Experience ───────────────────────────────────────────────────────────────
// Core section — reverse chronological
// 3–6 bullets per role: Action Verb + Context + Measurable Result

export interface ExperienceEntry {
  company: string;
  location?: string;
  title: string;
  duration: string;         // "Jan 2023 – Present"
  bullets: string[];        // min 2, max 6 — fewer for older/less relevant roles
}

// ─── Education ────────────────────────────────────────────────────────────────

export interface EducationEntry {
  institution: string;      // "Galgotias College of Engineering and Technology"
  degree: string;           // "B.Tech (IT)"
  duration: string;         // "Nov 2022 – Aug 2026"
  gpa?: string;             // Include only if 3.5+ and early-career
  coursework?: string;      // Only if directly relevant to the role
}

// ─── Projects ─────────────────────────────────────────────────────────────────
// 2–4 most relevant projects only
// Bullets: Action + What was built + Measurable outcome

export interface ProjectEntry {
  name: string;
  type: ProjectType;
  techStack: string[];      // Technologies used — improves ATS keyword match
  bullets: string[];        // min 2, max 5
  link?: string;            // GitHub / live demo — supplementary only
}

// ─── Achievements ─────────────────────────────────────────────────────────────
// Flat string — each must include a number or verifiable proof
// e.g. "Ranked top 5% in LeetCode India (2024)"

export type AchievementEntry = string;

// ─── Entry (generic — for custom/additional sections) ─────────────────────────

export interface Entry {
  heading?: string;
  subheading?: string;
  bullets?: string[];
  paragraph?: string;
}

// ─── Root Resume ──────────────────────────────────────────────────────────────

export interface ResumeData {
  name: string;
  contact?: ContactInfo;
  summary?: SummarySection;
  skills?: SkillCategory[];
  experience?: ExperienceEntry[];   // ✅ added — core section
  education?: EducationEntry[];
  projects?: ProjectEntry[];
  achievements?: AchievementEntry[]; // ✅ fixed — was { text: string }[], now string[]
}

// ─── Rewrite Output ───────────────────────────────────────────────────────────
// Extends ResumeData with AI explanation of what changed and why

export interface RewriteOutput extends ResumeData {
  changesExplained: string[];
}

export interface AnalysisResult {
  atsScore: number;
  strengths: string[];
  weaknesses: string[];
  overallFeedback: string;
  missingKeywords: string[];
}

