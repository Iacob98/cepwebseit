"use client";

import { useState, useRef } from "react";

interface AdminImageUploadProps {
  name: string;
  currentImage?: string;
  label?: string;
}

export function AdminImageUpload({ name, currentImage, label = "Bild" }: AdminImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(currentImage ?? null);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
    }
  }

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      <div className="flex items-start gap-4">
        {preview && (
          <div className="relative h-24 w-24 rounded-lg overflow-hidden border border-gray-200 flex-shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={preview} alt="Preview" className="h-full w-full object-cover" />
          </div>
        )}
        <div className="flex-1">
          <input
            ref={inputRef}
            type="file"
            name={name}
            accept="image/jpeg,image/png,image/webp"
            onChange={handleChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:rounded-lg file:border-0 file:bg-primary-50 file:px-4 file:py-2 file:text-sm file:font-medium file:text-primary hover:file:bg-primary-100 file:cursor-pointer cursor-pointer"
          />
          <p className="mt-1 text-xs text-gray-500">JPEG, PNG oder WebP. Max 10MB.</p>
          {currentImage && (
            <input type="hidden" name={`${name}_current`} value={currentImage} />
          )}
        </div>
      </div>
    </div>
  );
}
