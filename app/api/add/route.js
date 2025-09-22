import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import dbConnect from "@/lib/mongoose";
import BitTree from "@/models/BitTree";
import User from "@/models/User";
import { unstable_update as updateSession } from "next-auth"; // session refresh

export async function POST(request) {
  await dbConnect();

  const session = await getServerSession(authOptions);
  if (!session) {
    return new Response(
      JSON.stringify({
        success: false,
        error: true,
        message: "You must be logged in to create a BitTree!",
        result: null,
      }),
      { status: 401 }
    );
  }

  const body = await request.json();
  const newHandle = (body.handle || session.user.handle || "").toString();

  if (!newHandle) {
    return new Response(
      JSON.stringify({
        success: false,
        error: true,
        message: "Handle is required",
        result: null,
      }),
      { status: 400 }
    );
  }

  // Check if another user already took this handle
  const duplicate = await BitTree.findOne({
    handle: newHandle,
    ownerEmail: { $ne: session.user.email }, // exclude current user
  });
  if (duplicate) {
    return new Response(
      JSON.stringify({
        success: false,
        error: true,
        message: "This handle is already taken by another user!",
        result: null,
      }),
      { status: 400 }
    );
  }

  // Find BitTree by email (ownerEmail)
  let existing = await BitTree.findOne({ ownerEmail: session.user.email });
  let doc;

  if (existing) {
    // update existing BitTree
    existing.handle = newHandle;
    existing.links = body.links || existing.links;
    existing.pic = body.pic || existing.pic;
    existing.desc = body.desc || existing.desc;
    await existing.save();
    doc = existing;
  } else {
    // create new BitTree
    doc = await BitTree.create({
      links: body.links || [],
      handle: newHandle,
      pic: body.pic || "",
      desc: body.desc || "",
      ownerEmail: session.user.email,
      ownerId:
        session.user.id ||
        session.user.sub ||
        session.user.email,
    });
  }

  // update User.handle + refresh session
  try {
    await User.findOneAndUpdate(
      { email: session.user.email },
      { $set: { handle: newHandle } },
      { new: true }
    );

    // refresh session with new handle
    await updateSession({
      user: {
        ...session.user,
        handle: newHandle,
      },
    });
  } catch (e) {
    console.error("Failed to update user.handle:", e);
  }

  return new Response(
    JSON.stringify({
      success: true,
      error: false,
      message: existing
        ? "Your BitTree has been updated!"
        : "Your BitTree has been generated!",
      handle: doc.handle,
      result: doc,
    }),
    { status: existing ? 200 : 201 }
  );
}
