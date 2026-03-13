import { SkillCategory } from "@/utils/types";
import { View, Text } from "@react-pdf/renderer";
import { styles as s } from "../styles";
import SectionHeader from "./SectionHeader";

export default function SkillsSection({ skills }: { skills: SkillCategory[] }) {
  return (
    <View>
      <SectionHeader title="Skills" />
      {skills.map((cat, i) => (
        <View key={i} style={s.skillRow}>
          <Text style={s.bulletDot}>•</Text>
          <Text style={s.skillLabel}>{cat.label}: </Text>
          <Text style={s.skillValue}>{cat.items.join(", ")}</Text>
        </View>
      ))}
    </View>
  );
}