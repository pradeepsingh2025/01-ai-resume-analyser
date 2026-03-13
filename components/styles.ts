import { StyleSheet } from "@react-pdf/renderer";


export const styles = StyleSheet.create({
  page: {
    backgroundColor: "#ffffff",
    paddingTop: 36,
    paddingBottom: 36,
    paddingHorizontal: 48,
    fontFamily: "Times-Roman",
    fontSize: 10.5,
    color: "#000000",
    lineHeight: 1.45,
  },

  // Name — title case, large, centered
  name: {
    fontSize: 20,
    fontFamily: "Times-Bold",
    textAlign: "center",
    marginBottom: 4,
    color: "#000000",
    letterSpacing: 0.3,
  },

  // Contact — centered, pipe-separated
  contactRow: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    marginBottom: 10,
  },
  contactItem: {
    fontSize: 10,
    color: "#000000",
    fontFamily: "Times-Roman",
  },
  contactPipe: {
    fontSize: 10,
    color: "#000000",
    marginHorizontal: 5,
  },

  // Section header — bold label + full rule beneath
  sectionTitle: {
    fontSize: 11.5,
    fontFamily: "Times-Bold",
    color: "#000000",
    marginBottom: 2,
    marginTop: 10,
  },
  sectionRule: {
    borderBottomWidth: 0.8,
    borderBottomColor: "#000000",
    marginBottom: 5,
  },

  // Education row
  eduHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 1,
  },
  eduInstitution: {
    fontFamily: "Times-Bold",
    fontSize: 10.5,
    flex: 1,
  },
  eduDuration: {
    fontSize: 10.5,
    fontFamily: "Times-Roman",
    textAlign: "right",
    marginLeft: 8,
  },

  // Bullet rows
  bulletRow: {
    flexDirection: "row",
    marginBottom: 2,
    paddingLeft: 4,
  },
  bulletDot: {
    fontSize: 10.5,
    marginRight: 6,
    fontFamily: "Times-Roman",
    lineHeight: 1.45,
  },
  bulletText: {
    fontSize: 10.5,
    fontFamily: "Times-Roman",
    flex: 1,
    lineHeight: 1.45,
  },

  // Skill bullet — "• Category: items"
  skillRow: {
    flexDirection: "row",
    marginBottom: 2,
    paddingLeft: 4,
  },
  skillLabel: {
    fontFamily: "Times-Bold",
    fontSize: 10.5,
  },
  skillValue: {
    fontFamily: "Times-Roman",
    fontSize: 10.5,
    flex: 1,
  },

  // Project header row
  projectHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 2,
    marginTop: 4,
  },
  projectName: {
    fontFamily: "Times-Bold",
    fontSize: 10.5,
  },
  projectType: {
    fontFamily: "Times-Roman",
    fontSize: 10.5,
    textAlign: "right",
    marginLeft: 8,
  },
});