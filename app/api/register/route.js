import dbConnect from "@/lib/mongoose"
import User from "@/models/User"
import bcrypt from "bcryptjs"

export async function POST(req) {
  await dbConnect()

  try {
    const { name, email, password } = await req.json()

    if (!name || !email || !password) {
      return new Response(
        JSON.stringify({ success: false, message: "All fields required" }),
        { status: 400 }
      )
    }

    // check if email already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return new Response(
        JSON.stringify({ success: false, message: "Email already registered" }),
        { status: 400 }
      )
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // create new user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      createdAt: new Date(),
    })

    return new Response(
      JSON.stringify({ success: true, message: "User registered", result: newUser, }),
      { status: 201 }
    )
  } catch (err) {
    return new Response(
      JSON.stringify({ success: false, message: err.message || "Something went wrong" }),
      { status: 500 }
    )
  }
}