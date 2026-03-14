export type SectionType = "bullets" | "entries" | "list" | "paragraph";

export interface Entry {
  heading?: string;
  subheading?: string;
  bullets?: string[];
  paragraph?: string;
}

export interface EducationEntry {
  institution: string;  // "Galgotias College of Engineering and Technology"
  degree: string;       // "B.Tech ( IT )"
  duration: string;     // "Nov 2022 - August 2026"
  coursework?: string;  // "OOPS, DBMS, ..."
}

export interface SkillCategory {
  label: string;       // "Languages", "Frameworks and Libraries" etc.
  items: string[];     // ["Java", "TypeScript", ...]
}

export interface ResumeData {
  name: string;
  contact?: {
    email?: string;
    phone?: string;
    linkedin?: string;
    github?: string;
    location?: string;
    website?: string;
    portfolio?: string;
    leetcode?: string;
    hackerrank?: string;
    codechef?: string;
    codeforces?: string;
  };
  education?: EducationEntry[];
  projects?: ProjectEntry[];
  achievements?: AchievementEntry[];
  summary?: string;
  skills?: SkillCategory[];
}

export interface ProjectEntry {
  name: string;         // "Movie Ticket Booking System"
  type: string;         // "Personal Project" | "Client Project"
  bullets: string[];
}

export interface AchievementEntry {
  text: string;
}

export interface AnalysisResult {
    atsScore: number;
    strengths: string[];
    weaknesses: string[];
    overallFeedback: string;
    missingKeywords: string[];
}

