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
            {/* ✅ Institution and degree on separate lines for clarity */}
            <View style={s.eduLeftCol}>
              <Text style={s.eduInstitution}>{edu.institution}</Text>
              <Text style={s.eduDegree}>{edu.degree}</Text>
            </View>
            <Text style={s.eduDuration}>{edu.duration}</Text>
          </View>
          {/* ✅ GPA — only renders if present (3.5+ for new grads) */}
          {edu.gpa && (
            <Bullet text={`GPA: ${edu.gpa}`} />
          )}
          {edu.coursework && (
            <Bullet text={`Relevant Coursework: ${edu.coursework}`} />
          )}
        </View>
      ))}
    </View>
  );
}
