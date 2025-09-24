import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import dbConnect from "@/lib/mongoose";
import BitTree from "@/models/BitTree";

export async function POST(req) {
  await dbConnect();

  const session = await getServerSession(authOptions);
  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { template } = await req.json();

  // If reset is true, the template will be blank.
  // Clean data: If reset default, set null or "default" in DB
  let newTemplate = template;
  if (!template || template.trim() === "") {
    newTemplate = "default";
  }

  // Searching by ownerEmail is safest
  const updated = await BitTree.findOneAndUpdate(
    { ownerEmail: session.user.email },
    { $set: { template: newTemplate } },
    { new: true }
  );

  if (!updated) {
    return new Response("BitTree not found", { status: 404 });
  }

  return new Response(JSON.stringify(updated), { status: 200 });
}
