import type { ImageLoaderProps } from "next/image";

export default function cloudinaryLoader({ src, width, quality }: ImageLoaderProps): string {
  const q = quality ?? 80;

  // Cloudinary — inject transformation parameters
  if (src.includes("res.cloudinary.com")) {
    return src.replace(
      "/image/upload/",
      `/image/upload/f_auto,q_${q},w_${width}/`
    );
  }

  // Unsplash — append their CDN resize params
  if (src.includes("images.unsplash.com")) {
    const url = new URL(src);
    url.searchParams.set("w", String(width));
    url.searchParams.set("q", String(q));
    url.searchParams.set("fm", "webp");
    url.searchParams.set("fit", "crop");
    return url.toString();
  }

  // All other URLs — return as-is
  return src;
}
