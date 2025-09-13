import clientPromise from "@/lib/mongodb"
import bcrypt from "bcryptjs"

export async function POST(req) {
  try {
    const { name, email, password } = await req.json()

    if (!name || !email || !password) {
      return new Response(
        JSON.stringify({ success: false, message: "All fields required" }),
        { status: 400 }
      )
    }

    const client = await clientPromise
    const db = client.db("bittree")

    // check if email already exists
    const existingUser = await db.collection("users").findOne({ email })
    if (existingUser) {
      return new Response(
        JSON.stringify({ success: false, message: "Email already registered" }),
        { status: 400 }
      )
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    const result = await db.collection("users").insertOne({
      name,
      email,
      password: hashedPassword,
      createdAt: new Date(),
    })

    return new Response(
      JSON.stringify({ success: true, message: "User registered", result }),
      { status: 201 }
    )
  } catch (err) {
    return new Response(
      JSON.stringify({ success: false, message: "Something went wrong" }),
      { status: 500 }
    )
  }
}
