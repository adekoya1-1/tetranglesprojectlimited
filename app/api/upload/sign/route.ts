import { NextResponse } from "next/server";
import { getAuthSession } from "@/lib/auth";
import { cloudinary } from "@/lib/cloudinary";

// POST /api/upload/sign — generate a Cloudinary signed upload signature
// The client uses this to upload directly to Cloudinary (bypasses Vercel payload limit)
export async function POST(request: Request) {
  try {
    const session = await getAuthSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { folder } = await request.json().catch(() => ({}));
    const uploadFolder = (folder as string) ?? "tetrangles/projects";
    const timestamp = Math.round(Date.now() / 1000);

    const paramsToSign = { timestamp, folder: uploadFolder };
    const signature = cloudinary.utils.api_sign_request(
      paramsToSign,
      process.env.CLOUDINARY_API_SECRET!
    );

    return NextResponse.json({
      signature,
      timestamp,
      folder: uploadFolder,
      cloudName: process.env.CLOUDINARY_CLOUD_NAME,
      apiKey: process.env.CLOUDINARY_API_KEY,
    });
  } catch (err) {
    console.error("[upload/sign] Error:", err);
    return NextResponse.json({ error: "Failed to sign upload" }, { status: 500 });
  }
}
