import { auth } from "@clerk/nextjs/server";
import prismaClient from "@/lib/prisma";

export async function GET(req: Request, { params }: { params: { analysisId: string } }) {
    const { userId } = await auth();
    if (!userId) return Response.json({ error: "Unauthorized" }, { status: 401 });

    const { analysisId } = await params;
    if (!analysisId) return Response.json({ error: "Missing analysis ID" }, { status: 400 });

    const prevAnalysis = await prismaClient.analysis.findUnique({
        where: {
            id: analysisId,
            userId,
        },
        select: {
            resumeText: { select: { content: true } },
            jobDescription: { select: { content: true } },
            missingKeywords: true,
        },
    });

    if (!prevAnalysis) return Response.json({ error: "Analysis not found" }, { status: 404 });

    return Response.json(prevAnalysis);
}