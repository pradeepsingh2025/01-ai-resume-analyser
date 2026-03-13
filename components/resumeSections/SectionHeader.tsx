import { View, Text } from "@react-pdf/renderer";
import { styles } from "../styles";

export default function SectionHeader({ title }: { title: string }) {
  return (
    <View>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.sectionRule} />
    </View>
  );
}