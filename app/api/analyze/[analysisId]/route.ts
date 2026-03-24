import { auth } from "@clerk/nextjs/server";
import prismaClient from "@/lib/prisma";

export async function GET(req: Request, { params }: { params: Promise<{ analysisId: string }> }) {
    const { userId } = await auth();
    if (!userId) return new Response("Unauthorized", { status: 401 });

    const { analysisId } = await params;
    if (!analysisId) return new Response("Missing analysis ID", { status: 400 });

    const analysis = await prismaClient.analysis.findUnique({
        where: {
            id: analysisId,
            userId,
        },
    });

    if (!analysis) return new Response("Analysis not found", { status: 404 });

    return Response.json(analysis);
}