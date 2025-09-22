import dbConnect from "@/lib/mongoose";
import User from "@/models/User";
import BitTree from "@/models/BitTree";

export async function GET(req, { params }) {
  await dbConnect();
  const email = decodeURIComponent(params.email || "");
  if (!email) {
    return new Response(
      JSON.stringify({ success: false, message: "No email provided" }),
      { status: 400 }
    );
  }

  // First find the user.
  const user = await User.findOne({ email })
    .select("handle name image email")
    .lean();

  if (!user) {
    return new Response(
      JSON.stringify({ success: false, message: "User not found" }),
      { status: 404 }
    );
  }

  // Now bring up his BitTree document.
  const tree = await BitTree.findOne({ ownerEmail: email })
    .select("handle links pic desc createdAt")
    .lean();

  // 🔑 handle preference: user.handle → tree.handle → null
  const finalHandle = user.handle || tree?.handle || null;

  // If user.handle is empty but exists in BitTree, then update the user collection as well.
  if (!user.handle && tree?.handle) {
    await User.findOneAndUpdate(
      { email },
      { $set: { handle: tree.handle } },
      { new: true }
    );
  }

  return new Response(
    JSON.stringify({
      success: true,
      user: {
        ...user,
        handle: finalHandle,
      },
      bittree: tree || null,
    }),
    { status: 200 }
  );
}

