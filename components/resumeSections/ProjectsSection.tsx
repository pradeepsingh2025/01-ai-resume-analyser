import { ProjectEntry } from "@/utils/types";
import { View, Text } from "@react-pdf/renderer";
import { styles as s } from "../styles";
import SectionHeader from "./SectionHeader";
import Bullet from "./BulletPoint";
import { Link } from "@react-pdf/renderer";

export default function ProjectsSection({ projects }: { projects: ProjectEntry[] }) {
  return (
    <View>
      <SectionHeader title="Projects" />
      {projects.map((proj, i) => (
        <View key={i}>
          <View style={s.projectHeaderRow}>
            {/* ✅ Name + optional link side by side */}
            <View style={s.projectNameRow}>
              <Text style={s.projectName}>{proj.name}</Text>
              {proj.link && (
                <Link src={proj.link} style={s.projectLink}>
                  {proj.link}
                </Link>
              )}
            </View>
            <Text style={s.projectType}>{proj.type}</Text>
          </View>

          {/* ✅ Tech stack line — improves ATS keyword density */}
          {proj.techStack && proj.techStack.length > 0 && (
            <Text style={s.projectTechStack}>
              Tech: {proj.techStack.join(", ")}
            </Text>
          )}

          {proj.bullets.map((b, j) => (
            <Bullet key={j} text={b} />
          ))}
        </View>
      ))}
    </View>
  );
}