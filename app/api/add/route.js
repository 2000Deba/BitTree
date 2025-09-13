import clientPromise from "@/lib/mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return new Response(JSON.stringify({
      success: false,
      error: true,
      message: "You must be logged in to create a BitTree!",
      result: null
    }), { status: 401 });
  }

  const body = await request.json();
  const client = await clientPromise;
  const db = client.db("bittree");
  const collection = db.collection("links");

  const handle = (body.handle || session.user.handle || "").toString().trim();

  if (!handle) {
    return new Response(JSON.stringify({
      success: false,
      error: true,
      message: "Handle is required",
      result: null
    }), { status: 400 });
  }

  // check if handle already exists
  const doc = await collection.findOne({ handle });
  if (doc) {
    return new Response(JSON.stringify({
      success: false,
      error: true,
      message: "This BitTree already exists!",
      result: null
    }), { status: 400 });
  }

  const newDoc = {
    links: body.links || [],
    handle,
    pic: body.pic || "",
    desc: body.desc || "",
    ownerEmail: session.user.email || null,
    ownerId: session.user.id || null,
    createdAt: new Date()
  };

  const result = await collection.insertOne(newDoc);

  return new Response(JSON.stringify({
    success: true,
    error: false,
    message: "Your BitTree has been generated!",
    result
  }), { status: 201 });
}
