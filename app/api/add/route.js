import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import dbConnect from "@/lib/mongoose";
import BitTree from "@/models/BitTree";
import User from "@/models/User";

// sanitize handle (same as model)
function sanitizeHandle(handle) {
  if (!handle) return handle;
  return handle
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-zA-Z0-9-_]/g, "");
}

// sanitize links
function sanitizeLinks(links = []) {
  return links
    .filter(
      (item) =>
        item &&
        typeof item.linktext === "string" &&
        typeof item.link === "string" &&
        item.linktext.trim() !== "" &&
        item.link.trim() !== ""
    )
    .map((item) => ({
      linktext: item.linktext.trim(),
      link: item.link.trim(),
    }));
}

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
  const newHandle = sanitizeHandle(
    (body.handle || session.user.handle || "").toString()
  );

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

  // sanitize links
  const safeLinks = sanitizeLinks(body.links);

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
    existing.links = safeLinks;
    existing.pic = body.pic?.trim() || existing.pic;
    existing.desc = body.desc?.trim() || existing.desc;
    existing.template = body.template || existing.template;
    await existing.save();
    doc = existing;
  } else {
    // create new BitTree
    doc = await BitTree.create({
      links: safeLinks,
      handle: newHandle,
      pic: body.pic?.trim() || "",
      desc: body.desc?.trim() || "",
      template: body.template || "",
      ownerEmail: session.user.email,
      ownerId: session.user.id || session.user.sub || session.user.email,
    });
  }

  // update User.handle (DB only, no session refresh)
  try {
    await User.findOneAndUpdate(
      { email: session.user.email },
      { $set: { handle: newHandle } },
      { new: true }
    );

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