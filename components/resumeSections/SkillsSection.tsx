import { View, Text } from "@react-pdf/renderer";
import { styles } from "../styles";

export default function SkillsSection({ skills }: { skills: string[] }) {
  return (
    <View style={styles.skillsGrid}>
      {skills.map((skill, i) => (
        <Text key={i} style={styles.skillPill}>{skill}</Text>
      ))}
    </View>
  );
}