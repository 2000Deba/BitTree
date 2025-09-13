// app/api/auth/signup/route.js
import clientPromise from "@/lib/mongodb";
import bcrypt from "bcryptjs";

export async function POST(request) {
  try {
    const { name, email, password, handle } = await request.json();

    if (!email || !password || !name || !handle) {
      return new Response(JSON.stringify({ error: "Missing fields" }), { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("bittree");

    // check existing email or handle
    const exists = await db.collection("users").findOne({ $or: [{ email }, { handle }] });
    if (exists) {
      return new Response(JSON.stringify({ error: "Email or handle already in use" }), { status: 400 });
    }

    const hashed = await bcrypt.hash(password, 10);
    const result = await db.collection("users").insertOne({
      name,
      email,
      password: hashed,
      handle,
      createdAt: new Date(),
    });

    return new Response(JSON.stringify({ ok: true }), { status: 201 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
