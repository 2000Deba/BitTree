import dbConnect from "@/lib/mongoose";
import BitTree from "@/models/BitTree";

// GET - fetch BitTree by handle (public profile)
export async function GET(req, { params }) {
  await dbConnect();
  const { handle } = params;

  if (!handle) {
    return new Response(
      JSON.stringify({ success: false, message: "Handle is required" }),
      { status: 400 }
    );
  }

  const doc = await BitTree.findOne({ handle }).lean();
  if (!doc) {
    return new Response(
      JSON.stringify({ success: false, message: "BitTree not found" }),
      { status: 404 }
    );
  }

  return new Response(
    JSON.stringify({ success: true, result: doc }),
    { status: 200 }
  );
}
