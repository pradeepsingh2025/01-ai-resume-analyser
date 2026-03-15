import {
  Document,
  Page,
  Text,
  View,
  pdf,
} from "@react-pdf/renderer";
import { ResumeData } from "@/utils/types";
import { styles } from "./styles";
import SkillsSection from "./resumeSections/SkillsSection";
import SummarySection from "./resumeSections/SummarySection";
import ExperienceSection from "./resumeSections/ExperienceSection";
import ContactRow from "./resumeSections/ContactRow";
import EducationSection from "./resumeSections/EducationalSection";
import ProjectsSection from "./resumeSections/ProjectsSection";
import AchievementsSection from "./resumeSections/AchievementsSection";


export function ResumePDF({ data }: { data: ResumeData }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>

        {/* 1. Header */}
        <Text style={styles.name}>{data.name}</Text>
        
        <ContactRow contact={data.contact} />

        {/* 2. Summary — optional, only renders if present */}
        {data.summary && <SummarySection summary={data.summary} />}

        {/* 3. Skills — before experience for quick ATS keyword hit */}
        <SkillsSection skills={data.skills || []} />

        {/* 4. Experience — core section, reverse chronological */}
        {data.experience && data.experience.length > 0 && (
          <ExperienceSection entries={data.experience} />
        )}

        {/* 5. Projects — after experience, especially useful early-career */}
        <ProjectsSection projects={data.projects || []} />

        {/* 6. Education — near end unless fresh grad */}
        <EducationSection entries={data.education || []} />

        {/* 7. Achievements & Certifications — last */}
        {data.achievements && data.achievements.length > 0 && (
          <AchievementsSection achievements={data.achievements} />
        )}

      </Page>
    </Document>
  );
}

// ── Download helper ───────────────────────────────────────────────────────────

export async function downloadResumePDF(data: ResumeData, filename = "resume.pdf") {
  const blob = await pdf(<ResumePDF data={data} />).toBlob();
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}