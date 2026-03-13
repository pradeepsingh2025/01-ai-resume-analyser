import { AchievementEntry } from "@/utils/types";
import { View, Text } from "@react-pdf/renderer";
import SectionHeader from "./SectionHeader";
import Bullet from "./BulletPoint";

export default function AchievementsSection({ achievements }: { achievements: AchievementEntry[] }) {
  return (
    <View>
      <SectionHeader title="Achievements and Certifications" />
      {achievements.map((a, i) => (
        <Bullet key={i} text={a.text} />
      ))}
    </View>
  );
}