import { EducationEntry } from "@/utils/types";
import { View, Text } from "@react-pdf/renderer";
import { styles as s } from "../styles";
import SectionHeader from "./SectionHeader";
import Bullet from "./BulletPoint";

export default function EducationSection({ entries }: { entries: EducationEntry[] }) {
  return (
    <View>
      <SectionHeader title="Education" />
      {entries.map((edu, i) => (
        <View key={i}>
          <View style={s.eduHeaderRow}>
            <Text style={s.eduInstitution}>
              {edu.institution}, {edu.degree}
            </Text>
            <Text style={s.eduDuration}>{edu.duration}</Text>
          </View>
          {edu.coursework && (
            <Bullet text={`Coursework: ${edu.coursework}`} />
          )}
        </View>
      ))}
    </View>
  );
}