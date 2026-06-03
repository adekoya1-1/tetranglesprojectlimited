import { NextResponse } from "next/server";
import { getAuthSession } from "@/lib/auth";
import { cloudinary } from "@/lib/cloudinary";

// POST /api/upload/sign — generate a Cloudinary signed upload signature.
// The client uses this signature to upload directly to Cloudinary, bypassing
// Vercel's 4.5 MB serverless function payload limit.
export async function POST(request: Request) {
  try {
    const session = await getAuthSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // ── Validate that every required Cloudinary env var is present ─────────
    const cloudName  = process.env.CLOUDINARY_CLOUD_NAME;
    const apiKey     = process.env.CLOUDINARY_API_KEY;
    const apiSecret  = process.env.CLOUDINARY_API_SECRET;

    const missing: string[] = [];
    if (!cloudName  || cloudName  === "your-cloud-name") missing.push("CLOUDINARY_CLOUD_NAME");
    if (!apiKey     || apiKey     === "your-api-key")    missing.push("CLOUDINARY_API_KEY");
    if (!apiSecret  || apiSecret  === "your-api-secret") missing.push("CLOUDINARY_API_SECRET");

    if (missing.length > 0) {
      console.error(
        `[upload/sign] Cloudinary not configured. Missing or placeholder env vars: ${missing.join(", ")}`
      );
      return NextResponse.json(
        {
          error: "Cloudinary is not configured on this server.",
          missing,               // tells the UI exactly which vars are absent
        },
        { status: 503 }
      );
    }
    // ───────────────────────────────────────────────────────────────────────

    const { folder } = await request.json().catch(() => ({}));
    const uploadFolder = (folder as string) ?? "tetrangles/projects";
    const timestamp = Math.round(Date.now() / 1000);

    const paramsToSign = { timestamp, folder: uploadFolder };
    const signature = cloudinary.utils.api_sign_request(paramsToSign, apiSecret!);

    console.log(`[upload/sign] Signature generated for folder "${uploadFolder}", cloud "${cloudName}"`);

    return NextResponse.json({
      signature,
      timestamp,
      folder:    uploadFolder,
      cloudName, // server-controlled — never undefined after the guard above
      apiKey,    // semi-public; needed by Cloudinary's signed upload API
    });
  } catch (err) {
    console.error("[upload/sign] Unexpected error:", err);
    return NextResponse.json({ error: "Failed to sign upload" }, { status: 500 });
  }
}
