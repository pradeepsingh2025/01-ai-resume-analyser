import { Link, Text, View } from "@react-pdf/renderer";
import { ResumeData } from "@/utils/types";
import { styles } from "../styles";

// Keys that should render as labelled hyperlinks
const URL_FIELDS = new Set([
  "linkedin", "github", "website", "portfolio",
  "leetcode", "hackerrank", "codechef", "codeforces",
]);

// Human-readable labels for each key
const FIELD_LABELS: Record<string, string> = {
  linkedin: "LinkedIn",
  github: "GitHub",
  website: "Website",
  portfolio: "Portfolio",
  leetcode: "LeetCode",
  hackerrank: "HackerRank",
  codechef: "CodeChef",
  codeforces: "Codeforces",
};

export default function ContactRow({ contact }: { contact: ResumeData["contact"] }) {
  if (!contact) return null;
  const items = Object.entries(contact).filter(([, v]) => Boolean(v)) as [string, string][];

  return (
    <View style={styles.contactRow}>
      {items.map(([key, value], i) => (
        <View key={i} style={{ flexDirection: "row" }}>
          {i > 0 && <Text style={styles.contactPipe}>|</Text>}

          {URL_FIELDS.has(key) ? (
            // Renders as "GitHub" but hyperlinks to the full URL
            <Link src={value} style={styles.contactItem}>
              {FIELD_LABELS[key] ?? key}
            </Link>
          ) : (
            // Plain text for email, phone, location
            <Text style={styles.contactItem}>{value}</Text>
          )}
        </View>
      ))}
    </View>
  );
}