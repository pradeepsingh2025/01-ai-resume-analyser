import { auth } from "@clerk/nextjs/server";
import prismaClient from "@/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: { rewriteId: string } }
) {
  const { userId } = await auth();
  if (!userId) return new Response("Unauthorized", { status: 401 });

  const { rewriteId } = await params;
  if (!rewriteId) return new Response("Missing rewrite ID", { status: 400 });

  const rewrite = await prismaClient.rewrite.findUnique({
    where: { id: rewriteId, userId },
    include: {
      contact: true,
      skills: true,
      experience: true,
      education: true,
      projects: true,
    },
  });

  if (!rewrite) return new Response("Rewrite not found", { status: 404 });

  // Transform DB shape → RewriteOutput shape expected by ResumePDF
  const output = {
    name: rewrite.name,
    summary: rewrite.summary ?? undefined,
    achievements: rewrite.achievements,
    changesExplained: rewrite.changesExplained,
    contact: rewrite.contact
      ? {
          email: rewrite.contact.email ?? undefined,
          phone: rewrite.contact.phone ?? undefined,
          linkedin: rewrite.contact.linkedin ?? undefined,
          github: rewrite.contact.github ?? undefined,
          website: rewrite.contact.website ?? undefined,
          location: rewrite.contact.location ?? undefined,
        }
      : undefined,
    skills: rewrite.skills.map((s) => ({ label: s.label, items: s.items })),
    experience: rewrite.experience.map((e) => ({
      company: e.company,
      title: e.title,
      duration: e.duration,
      bullets: e.bullets,
    })),
    education: rewrite.education.map((e) => ({
      institution: e.institution,
      degree: e.degree,
      duration: e.duration,
      gpa: e.gpa ?? undefined,
      coursework: e.coursework ?? undefined,
    })),
    projects: rewrite.projects.map((p) => ({
      name: p.name,
      techStack: p.techStack,
      bullets: p.bullets,
      link: p.link ?? undefined,
    })),
  };

  return Response.json(output);
}
