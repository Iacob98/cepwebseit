"use client";

import { useState, useRef, useActionState } from "react";
import { updatePageImageAction } from "@/actions/admin/pages";

interface PageImageFieldProps {
  slug: string;
  section: string;
  field: string;
  currentImage: string;
}

export function PageImageField({ slug, section, field, currentImage }: PageImageFieldProps) {
  const [preview, setPreview] = useState<string | null>(currentImage || null);
  const [newFile, setNewFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [state, formAction, isPending] = useActionState(updatePageImageAction, null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setNewFile(file);
    const url = URL.createObjectURL(file);
    setPreview((prev) => {
      if (prev?.startsWith("blob:")) URL.revokeObjectURL(prev);
      return url;
    });
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData();
    fd.append("slug", slug);
    fd.append("section", section);
    fd.append("field", field);
    if (newFile) {
      fd.append("file", newFile);
    } else if (currentImage) {
      fd.append("existing", currentImage);
    }
    formAction(fd);
  }

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">{field}</label>

      {state?.error && <p className="text-sm text-red-600">{state.error}</p>}
      {state?.success && <p className="text-sm text-green-600">Bild gespeichert!</p>}

      <form onSubmit={handleSubmit} className="space-y-2">
        <div className="relative aspect-video max-w-sm rounded-lg border-2 border-dashed border-gray-300 overflow-hidden bg-gray-50 flex items-center justify-center">
          {preview ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={preview}
              alt={field}
              className="absolute inset-0 h-full w-full object-cover"
            />
          ) : (
            <span className="text-sm text-gray-400">Kein Bild</span>
          )}
        </div>

        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-500 file:mr-2 file:rounded-lg file:border-0 file:bg-primary-50 file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-primary hover:file:bg-primary-100 file:cursor-pointer cursor-pointer"
        />

        <button
          type="submit"
          disabled={isPending || (!newFile && !currentImage)}
          className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90 disabled:opacity-50"
        >
          {isPending ? "Hochladen..." : "Bild speichern"}
        </button>
      </form>
    </div>
  );
}
