import { Section } from "@/utils/types";
import { Text, View } from "@react-pdf/renderer";
import { styles } from "../styles";
import BulletPoint from "./BulletPoint";
import EntryBlock from "./EntryBlock";

export default function DynamicSection({ section }: { section: Section }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{section.title}</Text>

      {/* entries — experience, education, projects */}
      {section.type === "entries" &&
        section.entries.map((entry, i) => <EntryBlock key={i} entry={entry} />)}

      {/* bullets — standalone bullet list */}
      {section.type === "bullets" &&
        section.entries.flatMap((e) => e.bullets ?? []).map((b, i) => (
          <BulletPoint key={i} text={b} />
        ))}

      {/* list — certs, awards, languages */}
      {section.type === "list" &&
        section.entries.map((e, i) => (
          <View key={i} style={styles.listItem}>
            <Text style={styles.listDot}>·</Text>
            <Text style={styles.listText}>{e.heading ?? e.paragraph}</Text>
          </View>
        ))}

      {/* paragraph — objective, summary-style sections */}
      {section.type === "paragraph" && (
        <Text style={styles.paragraph}>
          {section.entries[0]?.paragraph ?? ""}
        </Text>
      )}
    </View>
  );
}