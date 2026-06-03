"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";
import { Upload, X, Loader2, ImageIcon, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface UploadedImage {
  url: string;
  publicId: string;
}

interface ImageUploaderProps {
  value: UploadedImage[];
  onChange: (images: UploadedImage[]) => void;
  maxImages?: number;
  folder?: string;
}

export function ImageUploader({
  value,
  onChange,
  maxImages = 10,
  folder = "tetrangles/projects",
}: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const uploadFiles = useCallback(
    async (files: FileList | null) => {
      if (!files || files.length === 0) return;

      const remaining = maxImages - value.length;
      if (remaining <= 0) {
        setError(`Maximum ${maxImages} image${maxImages === 1 ? "" : "s"} allowed`);
        return;
      }

      const toUpload = Array.from(files).slice(0, remaining);
      setUploading(true);
      setError(null);

      try {
        // ── Step 1: Get a signed credential from our server ───────────────
        // This is a tiny JSON request — no file data crosses Vercel's limit.
        console.log("[ImageUploader] Requesting upload signature…");
        const signRes = await fetch("/api/upload/sign", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ folder }),
        });

        const signData = await signRes.json();

        if (!signRes.ok) {
          // Surface the specific missing env vars so admins know what to fix
          if (signData.missing?.length) {
            const vars = (signData.missing as string[]).join(", ");
            throw new Error(
              `Cloudinary is not configured. Add these environment variables to Vercel: ${vars}`
            );
          }
          throw new Error(signData.error ?? "Could not get upload credentials");
        }

        const { signature, timestamp, folder: signedFolder, cloudName, apiKey } = signData;

        // Guard: these must never be undefined after the server-side check,
        // but double-check on the client to catch misconfigured responses early.
        if (!cloudName || !apiKey || !signature) {
          console.error("[ImageUploader] Sign response missing fields:", {
            cloudName,
            apiKey: apiKey ? "present" : "missing",
            signature: signature ? "present" : "missing",
          });
          throw new Error("Incomplete upload credentials received from server");
        }

        console.log(`[ImageUploader] Credentials OK — uploading to cloud "${cloudName}", folder "${signedFolder}"`);

        // ── Step 2: Upload each file directly to Cloudinary ───────────────
        // The browser POSTs straight to Cloudinary — Vercel never sees the binary.
        const uploaded: UploadedImage[] = [];

        for (const file of toUpload) {
          console.log(`[ImageUploader] Uploading "${file.name}" (${(file.size / 1024).toFixed(0)} KB)…`);

          const formData = new FormData();
          formData.append("file",      file);
          formData.append("api_key",   apiKey);
          formData.append("timestamp", String(timestamp));
          formData.append("signature", signature);
          formData.append("folder",    signedFolder);

          const uploadRes = await fetch(
            `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
            { method: "POST", body: formData }
          );

          const uploadData = await uploadRes.json();

          if (!uploadRes.ok) {
            const msg = uploadData.error?.message ?? "Cloudinary upload failed";
            console.error("[ImageUploader] Cloudinary error:", uploadData.error);
            throw new Error(msg);
          }

          console.log(`[ImageUploader] ✓ Uploaded: ${uploadData.secure_url}`);
          uploaded.push({
            url:      uploadData.secure_url,
            publicId: uploadData.public_id,
          });
        }

        onChange([...value, ...uploaded]);
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Upload failed";
        console.error("[ImageUploader] Upload error:", msg);
        setError(msg);
      } finally {
        setUploading(false);
        if (inputRef.current) inputRef.current.value = "";
      }
    },
    [value, onChange, maxImages, folder]
  );

  const removeImage = async (index: number) => {
    const img = value[index];
    // Best-effort server-side delete from Cloudinary
    try {
      await fetch("/api/upload", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ publicId: img.publicId }),
      });
    } catch {
      // If delete fails, the image stays in Cloudinary but is removed from the form
    }
    onChange(value.filter((_, i) => i !== index));
  };

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      uploadFiles(e.dataTransfer.files);
    },
    [uploadFiles]
  );

  return (
    <div className="space-y-3">
      {/* Upload zone */}
      {value.length < maxImages && (
        <div
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => !uploading && inputRef.current?.click()}
          className={cn(
            "flex cursor-pointer flex-col items-center justify-center gap-2 border-2 border-dashed p-8 text-center transition-colors",
            uploading && "cursor-not-allowed opacity-60",
            dragOver
              ? "border-brand-orange bg-orange-50"
              : "border-gray-300 hover:border-gray-400 hover:bg-gray-50"
          )}
        >
          {uploading ? (
            <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
          ) : (
            <Upload className="h-6 w-6 text-gray-400" />
          )}
          <div>
            <p className="text-sm font-semibold text-gray-600">
              {uploading ? "Uploading…" : "Click or drag images here"}
            </p>
            <p className="text-xs text-gray-400">
              PNG, JPG, WebP · max 10 MB each · up to {maxImages} image{maxImages === 1 ? "" : "s"}
            </p>
          </div>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            multiple={maxImages > 1}
            className="hidden"
            onChange={(e) => uploadFiles(e.target.files)}
          />
        </div>
      )}

      {/* Error display */}
      {error && (
        <div className="flex items-start gap-2 rounded border border-red-200 bg-red-50 px-3 py-2">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
          <p className="text-xs text-red-700">{error}</p>
        </div>
      )}

      {/* Preview grid */}
      {value.length > 0 && (
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-5">
          {value.map((img, i) => (
            <div key={img.publicId} className="group relative aspect-square">
              <Image
                src={img.url}
                alt={`Upload ${i + 1}`}
                fill
                className="object-cover"
                sizes="120px"
              />
              {i === 0 && (
                <span className="absolute left-1 top-1 bg-brand-orange px-1.5 py-0.5 text-[9px] font-bold uppercase text-white">
                  Cover
                </span>
              )}
              <button
                type="button"
                onClick={() => removeImage(i)}
                className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center bg-black/70 text-white opacity-0 transition-opacity group-hover:opacity-100"
                aria-label="Remove image"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
          {value.length < maxImages && (
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="flex aspect-square items-center justify-center border-2 border-dashed border-gray-200 text-gray-300 transition-colors hover:border-gray-400 hover:text-gray-400"
            >
              <ImageIcon className="h-5 w-5" />
            </button>
          )}
        </div>
      )}
    </div>
  );
}
