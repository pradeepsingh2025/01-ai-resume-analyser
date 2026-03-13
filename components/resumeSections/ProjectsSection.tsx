import { ProjectEntry } from "@/utils/types";
import { View, Text } from "@react-pdf/renderer";
import { styles as s } from "../styles";
import SectionHeader from "./SectionHeader";
import Bullet from "./BulletPoint";

export default function ProjectsSection({ projects }: { projects: ProjectEntry[] }) {
  return (
    <View>
      <SectionHeader title="Projects" />
      {projects.map((proj, i) => (
        <View key={i}>
          <View style={s.projectHeaderRow}>
            <Text style={s.projectName}>{proj.name}</Text>
            <Text style={s.projectType}>{proj.type}</Text>
          </View>
          {proj.bullets.map((b, j) => (
            <Bullet key={j} text={b} />
          ))}
        </View>
      ))}
    </View>
  );
}