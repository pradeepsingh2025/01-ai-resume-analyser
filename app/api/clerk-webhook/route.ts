import { Webhook } from "svix";
import prismaClient from "@/lib/prisma";

export async function POST(req: Request) {
  const payload = await req.text();
  const headers = req.headers;

  const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET!);

  const evt = wh.verify(payload, {
    "svix-id": headers.get("svix-id")!,
    "svix-timestamp": headers.get("svix-timestamp")!,
    "svix-signature": headers.get("svix-signature")!,
  }) as any;

  const eventType = evt.type;
  const data = evt.data;

  if (eventType === "user.created") {
    await prismaClient.user.create({
      data: {
        id: data.id,
        email: data.email_addresses[0].email_address,
        name: `${data.first_name} ${data.last_name}`,
      },
    });
  }

  if (eventType === "user.updated") {
    await prismaClient.user.update({
      where: { id: data.id },
      data: {
        email: data.email_addresses[0].email_address,
        name: `${data.first_name} ${data.last_name}`,
      },
    });
  }

  if (eventType === "user.deleted") {
    await prismaClient.user.delete({
      where: { id: data.id },
    });
  }

  return new Response("OK");
}
