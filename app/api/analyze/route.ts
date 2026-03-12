import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { userId } = await auth(); // protect the route
  if (!userId) return new Response("Unauthorized", { status: 401 });

  const { resumeText, jobDescription } = await req.json();

  console.log("resumeText", resumeText);
  console.log("jobDescription", jobDescription);

  return NextResponse.json({ message: "working bro!!" }, { status: 200 });

  // Call OpenAI / Anthropic / Google here
  // Return ATS score + missing keywords as JSON
}