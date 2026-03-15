import { View, Text } from "@react-pdf/renderer";
import SectionHeader from "./SectionHeader";
import Bullet from "./BulletPoint";
import { styles } from "../styles";
import { ExperienceEntry } from "@/utils/types";

export default function ExperienceSection({ entries }: { entries: ExperienceEntry[] }) {
  return (
    <View>
      <SectionHeader title="Work Experience" />
      {entries.map((exp, i) => (
        <View key={i}>
          <View style={styles.expHeaderRow}>
            <View style={styles.expLeftCol}>
              <Text style={styles.expCompany}>{exp.company}</Text>
              <Text style={styles.expTitle}>{exp.title}</Text>
            </View>
            <View>
              <Text style={styles.expDurationLocation}>{exp.duration}</Text>
              {exp.location && (
                <Text style={styles.expDurationLocation}>{exp.location}</Text>
              )}
            </View>
          </View>
          {exp.bullets.map((b: string, j: number) => (
            <Bullet key={j} text={b} />
          ))}
        </View>
      ))}
    </View>
  );
}