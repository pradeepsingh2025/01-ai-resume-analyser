import { StyleSheet } from "@react-pdf/renderer";

export const styles = StyleSheet.create({
  page: {
    backgroundColor: "#ffffff",
    paddingTop: 30,
    paddingBottom: 30,
    paddingHorizontal: 32,
    fontFamily: "Helvetica",
    fontSize: 10,
    color: "#2d2d2d",
    lineHeight: 1.4,
  },

  // Name — clean, modern, centered
  name: {
    fontSize: 22,
    fontFamily: "Helvetica-Bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#1a1a1a",
    letterSpacing: 1.2,
    textTransform: "uppercase",
  },

  // Contact — centered, pipe-separated
  contactRow: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    marginBottom:3,
  },
  contactItem: {
    fontSize: 9,
    color: "#555555",
    fontFamily: "Helvetica",
  },
  contactPipe: {
    fontSize: 9,
    color: "#aaaaaa",
    marginHorizontal: 6,
  },

  // Section header — uppercase label + subtle thin rule
  sectionTitle: {
    fontSize: 10.5,
    fontFamily: "Helvetica-Bold",
    color: "#1a1a1a",
    marginBottom: 3,
    marginTop: 14,
    textTransform: "uppercase",
    letterSpacing: 1.5,
  },
  sectionRule: {
    borderBottomWidth: 0.5,
    borderBottomColor: "#cccccc",
    marginBottom: 6,
  },

  // Summary
  summaryText: {
    fontSize: 10,
    fontFamily: "Helvetica",
    lineHeight: 1.55,
    marginBottom: 2,
    textAlign: "left",
    color: "#333333",
  },

  // Experience
  expHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 1,
    marginTop: 6,
  },
  expLeftCol: {
    flex: 1,
  },
  expCompany: {
    fontFamily: "Helvetica-Bold",
    fontSize: 10,
    color: "#1a1a1a",
  },
  expTitle: {
    fontFamily: "Helvetica-Oblique",
    fontSize: 10,
    color: "#444444",
  },
  expDurationLocation: {
    fontSize: 9.5,
    fontFamily: "Helvetica",
    textAlign: "right",
    marginLeft: 8,
    color: "#666666",
  },

  // Education row
  eduHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 1,
    marginTop: 6,
  },
  eduLeftCol: {
    flex: 1,
  },
  eduInstitution: {
    fontFamily: "Helvetica-Bold",
    fontSize: 10,
    color: "#1a1a1a",
  },
  eduDegree: {
    fontFamily: "Helvetica-Oblique",
    fontSize: 10,
    color: "#444444",
  },
  eduDuration: {
    fontSize: 9.5,
    fontFamily: "Helvetica",
    textAlign: "right",
    marginLeft: 8,
    color: "#666666",
  },

  // Bullet rows
  bulletRow: {
    flexDirection: "row",
    marginBottom: 2,
    paddingLeft: 6,
  },
  bulletDot: {
    fontSize: 10,
    marginRight: 6,
    fontFamily: "Helvetica",
    lineHeight: 1.5,
    color: "#888888",
  },
  bulletText: {
    fontSize: 10,
    fontFamily: "Helvetica",
    flex: 1,
    lineHeight: 1.5,
    color: "#333333",
  },

  // Skill bullet — "Category: items"
  skillRow: {
    flexDirection: "row",
    marginBottom: 2,
    paddingLeft: 6,
  },
  skillLabel: {
    fontFamily: "Helvetica-Bold",
    fontSize: 10,
    color: "#1a1a1a",
  },
  skillValue: {
    fontFamily: "Helvetica",
    fontSize: 10,
    flex: 1,
    color: "#333333",
  },

  // Project header row
  projectHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 1,
    marginTop: 6,
  },
  projectNameRow: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    gap: 6,
  },
  projectName: {
    fontFamily: "Helvetica-Bold",
    fontSize: 10,
    color: "#1a1a1a",
  },
  projectLink: {
    fontFamily: "Helvetica",
    fontSize: 9,
    color: "#4a7fb5",
    textDecoration: "none",
  },
  projectType: {
    fontFamily: "Helvetica",
    fontSize: 9.5,
    textAlign: "right",
    marginLeft: 8,
    color: "#666666",
  },
  projectTechStack: {
    fontFamily: "Helvetica-Oblique",
    fontSize: 9.5,
    color: "#555555",
    paddingLeft: 6,
    marginBottom: 2,
  },
});