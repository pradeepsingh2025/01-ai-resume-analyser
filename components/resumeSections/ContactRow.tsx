import { ResumeData } from "@/utils/types";
import { View, Text } from "@react-pdf/renderer";
import { styles } from "../styles";

export default function ContactRow({ contact }: { contact: ResumeData["contact"] }) {
  if (!contact) return null;

  const items = [
    contact.email,
    contact.phone,
    contact.linkedin,
    contact.github,
    contact.location,
    contact.website,
    contact.portfolio,
    contact.leetcode,
    contact.hackerrank,
    contact.codechef,
    contact.codeforces,
  ].filter(Boolean) as string[];

  return (
    <View style={styles.contactRow}>
      {items.map((item, i) => (
        <Text key={i} style={styles.contactItem}>
          {i > 0 ? "· " : ""}{item}
        </Text>
      ))}
    </View>
  );
}