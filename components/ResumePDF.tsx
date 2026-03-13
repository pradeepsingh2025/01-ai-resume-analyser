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
import DynamicSection from "./resumeSections/DynamicSection";
import ContactRow from "./resumeSections/ContactRow";


export function ResumePDF({ data }: { data: ResumeData }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>

        {/* Header — name + contact */}
        <View style={styles.header}>
          <Text style={styles.name}>{data?.name?.toUpperCase()}</Text>
          <ContactRow contact={data?.contact} />
        </View>

        {/* Summary — if present as top-level field */}
        {data?.summary && (
          <View style={{ marginBottom: 14 }}>
            <Text style={styles.summary}>{data?.summary}</Text>
          </View>
        )}

        {/* Skills — rendered as pills if top-level */}
        {data?.skills && data?.skills.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Skills</Text>
            <SkillsSection skills={data?.skills} />
          </View>
        )}

        {/* All dynamic sections */}
        {data?.sections?.map((section, i) => (
          <DynamicSection key={i} section={section} />
        ))}

      </Page>
    </Document>
  );
}

// for download

export async function downloadResumePDF(data: ResumeData, filename = "resume.pdf") {
  const blob = await pdf(<ResumePDF data={data} />).toBlob();
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}