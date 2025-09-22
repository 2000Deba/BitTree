import clientPromise from "@/lib/mongodb";

// GET → will fetch BitTree data from the links collection
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    if (!email) {
      return new Response(JSON.stringify({ success: false, error: "Email required" }), { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("bittree");

    // Fetch data from links collection (using ownerEmail)
    const result = await db.collection("links").findOne({ ownerEmail: email });

    if (!result) {
      return new Response(JSON.stringify({ success: false, error: "Not found" }), { status: 404 });
    }

    return new Response(JSON.stringify({ success: true, result }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ success: false, error: err.message }), { status: 500 });
  }
}

// PUT → will only update the links collection + users.handle
export async function PUT(req) {
  try {
    const body = await req.json();
    const { email, handle, links, pic, desc } = body;

    if (!email) {
      return new Response(JSON.stringify({ success: false, error: "Email required" }), { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("bittree");

    // Step 1: Update links collection (with ownerEmail)
    const updateLinks = {
      $set: {
        ...(handle && { handle }),
        ...(Array.isArray(links) && { links }),
        ...(pic && { pic }),
        ...(desc && { desc }),
      },
    };

    const linksResult = await db.collection("links").updateOne(
      { ownerEmail: email },  // fix here
      updateLinks
    );

    if (linksResult.matchedCount === 0) {
      return new Response(JSON.stringify({ success: false, error: "BitTree not found for this email" }), { status: 404 });
    }

    // Step 2: If the handle has changed → update the users collection as well
    if (handle) {
      await db.collection("users").updateOne(
        { email }, //Here the field name in the users collection is "email".
        { $set: { handle } }
      );
    }

    return new Response(JSON.stringify({ success: true, message: "BitTree updated successfully" }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ success: false, error: err.message }), { status: 500 });
  }
}
