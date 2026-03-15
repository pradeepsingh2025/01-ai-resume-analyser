import { View, Text} from "@react-pdf/renderer";
import SectionHeader from "./SectionHeader";
import { styles } from "../styles";

export default function SummarySection({ summary }: { summary: string }) {
  return (
    <View>
      <SectionHeader title="Summary" />
      <Text style={styles.summaryText}>{summary}</Text>
    </View>
  );
}