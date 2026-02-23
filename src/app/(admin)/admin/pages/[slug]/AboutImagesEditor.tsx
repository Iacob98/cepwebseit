"use client";

import { useState, useRef, useActionState } from "react";
import { updateAboutImagesAction } from "@/actions/admin/pages";

interface AboutImagesEditorProps {
  images: string;
}

export function AboutImagesEditor({ images }: AboutImagesEditorProps) {
  const initial = images
    ? images.split(",").filter(Boolean)
    : [];

  const [slots, setSlots] = useState<(string | null)[]>(() => {
    const arr: (string | null)[] = [null, null, null];
    initial.forEach((img, i) => {
      if (i < 3) arr[i] = img;
    });
    return arr;
  });

  const [newFiles, setNewFiles] = useState<(File | null)[]>([null, null, null]);
  const [previews, setPreviews] = useState<(string | null)[]>(() => {
    const arr: (string | null)[] = [null, null, null];
    initial.forEach((img, i) => {
      if (i < 3) arr[i] = img;
    });
    return arr;
  });

  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  const [state, formAction, isPending] = useActionState(updateAboutImagesAction, null);

  function handleFileChange(index: number, e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    setPreviews((prev) => {
      const next = [...prev];
      next[index] = url;
      return next;
    });
    setNewFiles((prev) => {
      const next = [...prev];
      next[index] = file;
      return next;
    });
    setSlots((prev) => {
      const next = [...prev];
      next[index] = "new";
      return next;
    });
  }

  function handleRemove(index: number) {
    setPreviews((prev) => {
      const next = [...prev];
      if (next[index]?.startsWith("blob:")) URL.revokeObjectURL(next[index]!);
      next[index] = null;
      return next;
    });
    setNewFiles((prev) => {
      const next = [...prev];
      next[index] = null;
      return next;
    });
    setSlots((prev) => {
      const next = [...prev];
      next[index] = null;
      return next;
    });
    if (inputRefs[index].current) {
      inputRefs[index].current!.value = "";
    }
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData();

    for (let i = 0; i < 3; i++) {
      if (newFiles[i]) {
        fd.append(`image-${i}`, newFiles[i]!);
      }
      const existing = slots[i];
      if (existing && existing !== "new") {
        fd.append(`existing-${i}`, existing);
      }
    }

    formAction(fd);
  }

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4">
      <h3 className="text-md font-semibold text-gray-900 mb-3">About — Bilder</h3>

      {state?.error && (
        <p className="text-sm text-red-600 mb-3">{state.error}</p>
      )}
      {state?.success && (
        <p className="text-sm text-green-600 mb-3">Bilder gespeichert!</p>
      )}

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
          {[0, 1, 2].map((i) => (
            <div key={i} className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Bild {i + 1}
              </label>
              <div className="relative aspect-[4/3] rounded-lg border-2 border-dashed border-gray-300 overflow-hidden bg-gray-50 flex items-center justify-center">
                {previews[i] ? (
                  <>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={previews[i]!}
                      alt={`Bild ${i + 1}`}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemove(i)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 z-10"
                    >
                      &times;
                    </button>
                  </>
                ) : (
                  <span className="text-sm text-gray-400">Kein Bild</span>
                )}
              </div>
              <input
                ref={inputRefs[i]}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={(e) => handleFileChange(i, e)}
                className="block w-full text-sm text-gray-500 file:mr-2 file:rounded-lg file:border-0 file:bg-primary-50 file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-primary hover:file:bg-primary-100 file:cursor-pointer cursor-pointer"
              />
            </div>
          ))}
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90 disabled:opacity-50"
        >
          {isPending ? "Speichern..." : "Bilder speichern"}
        </button>
      </form>
    </div>
  );
}
