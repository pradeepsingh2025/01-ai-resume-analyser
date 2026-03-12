import { auth } from "@clerk/nextjs/server";

export async function POST(req: Request) {
  const { userId } = await auth(); // protect the route
  if (!userId) return new Response("Unauthorized", { status: 401 });

  const { resume, jobDescription } = await req.json();

  // Call OpenAI / Anthropic / Google here
  // Return ATS score + missing keywords as JSON
}