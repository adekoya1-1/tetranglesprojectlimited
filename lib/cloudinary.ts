import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export { cloudinary };

export interface CloudinaryUploadResult {
  public_id: string;
  secure_url: string;
  width: number;
  height: number;
  format: string;
  resource_type: string;
  bytes: number;
}

export async function uploadToCloudinary(
  file: string,
  folder: string = "tetrangles/projects"
): Promise<CloudinaryUploadResult> {
  const result = await cloudinary.uploader.upload(file, {
    folder,
    resource_type: "image",
    transformation: [{ quality: "auto:best", fetch_format: "auto" }],
  });

  return result as CloudinaryUploadResult;
}

export async function deleteFromCloudinary(publicId: string): Promise<void> {
  await cloudinary.uploader.destroy(publicId);
}

export function getCloudinaryUrl(
  publicId: string,
  options: { width?: number; height?: number; crop?: string } = {}
): string {
  const { width = 800, height, crop = "fill" } = options;

  const transforms: string[] = [
    `w_${width}`,
    height ? `h_${height}` : "",
    `c_${crop}`,
    "f_auto",
    "q_auto",
  ].filter(Boolean);

  return cloudinary.url(publicId, {
    transformation: transforms.join(","),
    secure: true,
  });
}
