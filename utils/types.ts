export type SectionType = "bullets" | "entries" | "list" | "paragraph";

export interface Entry {
  heading?: string;
  subheading?: string;
  bullets?: string[];
  paragraph?: string;
}

export interface Section {
  title: string;
  type: SectionType;
  entries: Entry[];
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
  summary?: string;
  skills?: string[];
  sections: Section[];
}
