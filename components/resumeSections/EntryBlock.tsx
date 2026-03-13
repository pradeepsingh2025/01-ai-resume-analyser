import { Entry } from "@/utils/types";
import { View, Text } from "@react-pdf/renderer";
import { styles } from "../styles";
import BulletPoint from "./BulletPoint";

export default function EntryBlock({ entry }: { entry: Entry }) {
  return (
    <View style={styles.entry}>
      {(entry.heading || entry.subheading) && (
        <View style={styles.entryHeader}>
          {entry.heading && (
            <Text style={styles.entryHeading}>{entry.heading}</Text>
          )}
          {entry.subheading && (
            <Text style={styles.entrySubheading}>{entry.subheading}</Text>
          )}
        </View>
      )}
      {entry.bullets?.map((b, i) => <BulletPoint key={i} text={b} />)}
      {entry.paragraph && (
        <Text style={styles.paragraph}>{entry.paragraph}</Text>
      )}
    </View>
  );
}