import { StyleSheet } from "@react-pdf/renderer";

const colors = {
  primary: "#1a1a2e",
  accent: "#b48c50",
  text: "#2d2d2d",
  muted: "#6b6b6b",
  border: "#e0d9cf",
  bg: "#fafaf8",
};

export const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.bg,
    paddingTop: 44,
    paddingBottom: 44,
    paddingHorizontal: 48,
    fontFamily: "Helvetica",
    fontSize: 10,
    color: colors.text,
    lineHeight: 1.5,
  },

  // Header
  header: {
    marginBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: colors.accent,
    paddingBottom: 12,
  },
  name: {
    fontSize: 26,
    fontFamily: "Helvetica-Bold",
    color: colors.primary,
    letterSpacing: 1.2,
    marginBottom: 6,
  },
  contactRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 4,
  },
  contactItem: {
    fontSize: 9,
    color: colors.muted,
    marginRight: 12,
  },
  contactDot: {
    fontSize: 9,
    color: colors.accent,
    marginRight: 12,
  },

  // Summary
  summary: {
    fontSize: 10,
    color: colors.text,
    lineHeight: 1.6,
    marginBottom: 16,
    fontStyle: "italic",
  },

  // Section
  section: {
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
    color: colors.primary,
    letterSpacing: 0.8,
    textTransform: "uppercase",
    marginBottom: 6,
    paddingBottom: 3,
    borderBottomWidth: 0.75,
    borderBottomColor: colors.border,
  },

  // Entry (experience, education, projects)
  entry: {
    marginBottom: 8,
  },
  entryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 2,
  },
  entryHeading: {
    fontSize: 10.5,
    fontFamily: "Helvetica-Bold",
    color: colors.primary,
    flex: 1,
  },
  entrySubheading: {
    fontSize: 9,
    color: colors.muted,
    textAlign: "right",
    marginLeft: 8,
  },

  // Bullets
  bulletRow: {
    flexDirection: "row",
    marginBottom: 2,
    paddingLeft: 4,
  },
  bulletDot: {
    fontSize: 10,
    color: colors.accent,
    marginRight: 6,
    marginTop: 0.5,
  },
  bulletText: {
    fontSize: 9.5,
    color: colors.text,
    flex: 1,
    lineHeight: 1.5,
  },

  // Skills (pill list)
  skillsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 4,
  },
  skillPill: {
    backgroundColor: "#f0ede8",
    borderWidth: 0.5,
    borderColor: colors.border,
    borderRadius: 3,
    paddingHorizontal: 7,
    paddingVertical: 2.5,
    fontSize: 9,
    color: colors.text,
    marginBottom: 4,
    marginRight: 4,
  },

  // Paragraph (summary / objective type sections)
  paragraph: {
    fontSize: 9.5,
    color: colors.text,
    lineHeight: 1.6,
  },

  // Standalone list (certs, awards, languages)
  listItem: {
    flexDirection: "row",
    marginBottom: 3,
  },
  listDot: {
    fontSize: 10,
    color: colors.accent,
    marginRight: 6,
  },
  listText: {
    fontSize: 9.5,
    color: colors.text,
  },
});