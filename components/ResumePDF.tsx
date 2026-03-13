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
import ContactRow from "./resumeSections/ContactRow";
import EducationSection from "./resumeSections/EducationalSection";
import ProjectsSection from "./resumeSections/ProjectsSection";
import AchievementsSection from "./resumeSections/AchievementsSection";


export function ResumePDF({ data }: { data: ResumeData }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.name}>{data.name}</Text>
        <ContactRow contact={data.contact} />
        <EducationSection entries={data.education || []} />
        <SkillsSection skills={data.skills || []} />
        <ProjectsSection projects={data.projects || []} />
        <AchievementsSection achievements={data.achievements || []} />
      </Page>
    </Document>
  );
}

// for download

export async function downloadResumePDF(data: ResumeData, filename = "resumter.pdf") {
  const blob = await pdf(<ResumePDF data={data} />).toBlob();
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}