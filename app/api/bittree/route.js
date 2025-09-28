import dbConnect from "@/lib/mongoose";
import BitTree from "@/models/BitTree";
import User from "@/models/User";

// GET → fetch BitTree data from MongoDB using mongoose
export async function GET(req) {
  await dbConnect();

  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    if (!email) {
      return new Response(
        JSON.stringify({ success: false, error: "Email required" }),
        { status: 400 }
      );
    }

    const result = await BitTree.findOne({ ownerEmail: email });

    if (!result) {
      return new Response(
        JSON.stringify({ success: false, error: "Not found" }),
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify({ success: true, result }),
      { status: 200 }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ success: false, error: err.message }),
      { status: 500 }
    );
  }
}

// PUT → update links + user.handle using mongoose
export async function PUT(req) {
  await dbConnect();

  try {
    const body = await req.json();
    const { email, handle, links, pic, desc, template } = body;

    if (!email) {
      return new Response(
        JSON.stringify({ success: false, error: "Email required" }),
        { status: 400 }
      );
    }

    // Step 1: Update BitTree document
    const updateFields = {};
    if (handle) updateFields.handle = handle.trim().replace(/\s+/g, "-").replace(/[^a-zA-Z0-9-_]/g, "");
    if (Array.isArray(links)) updateFields.links = links;
    if (pic) updateFields.pic = pic;
    if (desc) updateFields.desc = desc;
    if (template) updateFields.template = template;

    const updated = await BitTree.findOneAndUpdate(
      { ownerEmail: email },
      { $set: updateFields },
      { new: true }
    );

    if (!updated) {
      return new Response(
        JSON.stringify({ success: false, error: "BitTree not found for this email" }),
        { status: 404 }
      );
    }

    // Step 2: update User.handle if handle changed
    if (handle) {
      await User.findOneAndUpdate(
        { email },
        { $set: { handle: updateFields.handle } },
        { new: true }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "BitTree updated successfully",
        result: updated,
      }),
      { status: 200 }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ success: false, error: err.message }),
      { status: 500 }
    );
  }
}