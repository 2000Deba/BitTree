import { v2 as cloudinary } from "cloudinary";

// configure Cloudinary with env vars
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req) {
    try {
        // formData() supports file uploads from client fetch with FormData
        const formData = await req.formData();
        const file = formData.get("file");

        if (!file) {
            return new Response(JSON.stringify({ error: "No file provided" }), { status: 400 });
        }

        // convert uploaded File to Buffer
        const buffer = Buffer.from(await file.arrayBuffer());
        // create a data URI that Cloudinary accepts
        const dataUri = `data:${file.type};base64,${buffer.toString("base64")}`;

        // upload to Cloudinary
        const result = await cloudinary.uploader.upload(dataUri, {
            folder: "bittree",         // keep uploads organized
            resource_type: "image",    // image only
        });

        // return the secure URL back to client
        return new Response(JSON.stringify({ url: result.secure_url }), { status: 200 });
    } catch (err) {
        console.error("Upload error:", err);
        return new Response(JSON.stringify({ error: "Upload failed" }), { status: 500 });
    }
}
