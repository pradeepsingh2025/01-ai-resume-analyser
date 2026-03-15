import { View } from "@react-pdf/renderer";
import SectionHeader from "./SectionHeader";
import Bullet from "./BulletPoint";

export default function AchievementsSection({ achievements }: { achievements: string[] }) {
  return (
    <View>
      <SectionHeader title="Achievements and Certifications" />
      {achievements.map((a, i) => (
        <Bullet key={i} text={a} />
      ))}
    </View>
  );
}