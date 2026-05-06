"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";
import { Upload, X, Loader2, ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface UploadedImage {
  url: string;
  publicId: string;
}

interface ImageUploaderProps {
  value: UploadedImage[];
  onChange: (images: UploadedImage[]) => void;
  maxImages?: number;
}

export function ImageUploader({
  value,
  onChange,
  maxImages = 10,
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
        setError(`Maximum ${maxImages} images allowed`);
        return;
      }

      const toUpload = Array.from(files).slice(0, remaining);
      setUploading(true);
      setError(null);

      try {
        const uploaded: UploadedImage[] = [];
        for (const file of toUpload) {
          const formData = new FormData();
          formData.append("file", file);

          const res = await fetch("/api/upload", {
            method: "POST",
            body: formData,
          });

          if (!res.ok) {
            const data = await res.json();
            throw new Error(data.error ?? "Upload failed");
          }

          const data = await res.json();
          uploaded.push({ url: data.url, publicId: data.publicId });
        }
        onChange([...value, ...uploaded]);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Upload failed");
      } finally {
        setUploading(false);
        if (inputRef.current) inputRef.current.value = "";
      }
    },
    [value, onChange, maxImages]
  );

  const removeImage = async (index: number) => {
    const img = value[index];
    try {
      await fetch("/api/upload", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ publicId: img.publicId }),
      });
    } catch {
      // best-effort delete from Cloudinary; remove locally regardless
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
          onClick={() => inputRef.current?.click()}
          className={cn(
            "flex cursor-pointer flex-col items-center justify-center gap-2 border-2 border-dashed p-8 text-center transition-colors",
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
              PNG, JPG, WebP · max 10 MB each · up to {maxImages} images
            </p>
          </div>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(e) => uploadFiles(e.target.files)}
          />
        </div>
      )}

      {error && <p className="text-xs text-red-600">{error}</p>}

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
              {/* Primary badge */}
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
