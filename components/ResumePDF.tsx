// components/ResumePDF.tsx
import { Document, Page, Text, View, StyleSheet, pdf } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: { padding: 40, fontFamily: "Helvetica", fontSize: 11, lineHeight: 1.5 },
  name: { fontSize: 20, fontWeight: "bold", marginBottom: 4 },
  section: { marginTop: 12 },
  heading: { fontSize: 13, fontWeight: "bold", borderBottomWidth: 1, borderColor: "#ccc", paddingBottom: 2, marginBottom: 6 },
  bullet: { marginLeft: 12, marginBottom: 2 },
});

export function ResumePDF({ content }: { content: string }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.name}>John Doe</Text>
        {/* Parse and render sections from rewrittenResume string */}
        <View style={styles.section}>
          <Text style={styles.heading}>Professional Summary</Text>
          <Text>{content}</Text>
        </View>
      </Page>
    </Document>
  );
}

// Download trigger — runs fully in browser
export async function downloadResumePDF(content: string) {
  const blob = await pdf(<ResumePDF content={content} />).toBlob();
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "resume.pdf";
  a.click();
  URL.revokeObjectURL(url);
}