// types/resume.ts

export type SectionType = "bullets" | "entries" | "list" | "paragraph";

export interface ContactInfo {
  email?: string;
  phone?: string;
  linkedin?: string;
  github?: string;
  website?: string;
  location?: string;   
}

export type SummarySection = string;

export interface SkillCategory {
  label: string;    
  items: string[];  
}

export interface ExperienceEntry {
  company: string;
  location?: string;
  title: string;
  duration: string;         
  bullets: string[];        
}

export interface EducationEntry {
  institution: string;      
  degree: string;           
  duration: string;         
  gpa?: string;             
  coursework?: string;      
}

export interface ProjectEntry {
  name: string;
  date: string;
  techStack: string[];      
  bullets: string[];        
  link?: string;            
}

export type AchievementEntry = string;

export interface Entry {
  heading?: string;
  subheading?: string;
  bullets?: string[];
  paragraph?: string;
}

export interface ResumeData {
  name: string;
  contact?: ContactInfo;
  summary?: SummarySection;
  skills?: SkillCategory[];
  experience?: ExperienceEntry[];   
  education?: EducationEntry[];
  projects?: ProjectEntry[];
  achievements?: AchievementEntry[]; 
}

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

