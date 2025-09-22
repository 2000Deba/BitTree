import { getServerSession } from "next-auth";
import dbConnect from "@/lib/mongoose";
import BitTree from "@/models/BitTree";

export async function POST(req) {
  await dbConnect();

  const session = await getServerSession(); 
  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { template } = await req.json();

  // Find the user's handle (assuming it's in session.user.handle)
  const updated = await BitTree.findOneAndUpdate(
    { handle: session.user.handle },
    { template },
    { new: true }
  );

  return Response.json(updated);
}
