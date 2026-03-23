import { auth } from "@clerk/nextjs/server";
import prismaClient from "@/lib/prisma";

export async function GET() {
  const { userId } = await auth();
  if (!userId) return new Response("Unauthorized", { status: 401 });

  const analyses = await prismaClient.analysis.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    include: {
      jobDescription: { select: { content: true } },
      resumeText: { select: { content: true } },
      rewrites: { select: { id: true, createdAt: true } },
    },
  });

  return Response.json(analyses);
}
