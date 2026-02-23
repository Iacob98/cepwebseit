"use client";

import Link from "next/link";
import { useTransition } from "react";
import { DeleteConfirmDialog } from "@/components/admin/DeleteConfirmDialog";
import type { HeroSlideData } from "@/lib/dal-schemas";

interface SlidesListProps {
  slides: HeroSlideData[];
  deleteAction: (id: string) => Promise<void>;
  reorderAction: (orderedIds: string[]) => Promise<void>;
}

export function SlidesList({ slides, deleteAction, reorderAction }: SlidesListProps) {
  const [isPending, startTransition] = useTransition();

  const sorted = [...slides].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  function moveSlide(index: number, direction: -1 | 1) {
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= sorted.length) return;
    const reordered = [...sorted];
    [reordered[index], reordered[newIndex]] = [reordered[newIndex], reordered[index]];
    startTransition(() => {
      reorderAction(reordered.map((s) => s.id));
    });
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {sorted.map((slide, index) => (
        <div key={slide.id} className="rounded-xl border border-gray-200 bg-white overflow-hidden">
          <div className="h-40 w-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={slide.image} alt={slide.title || "Slide"} className="h-full w-full object-cover" />
          </div>
          <div className="p-4">
            {slide.title && <p className="font-medium text-gray-900 text-sm">{slide.title}</p>}
            {slide.subtitle && <p className="text-xs text-gray-500 mt-0.5">{slide.subtitle}</p>}
            <div className="mt-3 flex items-center justify-between">
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  disabled={index === 0 || isPending}
                  onClick={() => moveSlide(index, -1)}
                  className="rounded border border-gray-200 px-2 py-1 text-xs text-gray-600 hover:bg-gray-50 disabled:opacity-30 transition-colors"
                >
                  ↑
                </button>
                <button
                  type="button"
                  disabled={index === sorted.length - 1 || isPending}
                  onClick={() => moveSlide(index, 1)}
                  className="rounded border border-gray-200 px-2 py-1 text-xs text-gray-600 hover:bg-gray-50 disabled:opacity-30 transition-colors"
                >
                  ↓
                </button>
              </div>
              <div className="flex items-center gap-2">
                <Link
                  href={`/admin/hero-slider/${slide.id}/edit`}
                  className="rounded-lg border border-gray-200 px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  Bearbeiten
                </Link>
                <DeleteConfirmDialog
                  onDelete={() => deleteAction(slide.id)}
                  itemName="diesen Slide"
                />
              </div>
            </div>
          </div>
        </div>
      ))}
      {slides.length === 0 && (
        <div className="col-span-full rounded-xl border border-gray-200 bg-white px-4 py-8 text-center text-gray-500">
          Keine Slides vorhanden.
        </div>
      )}
    </div>
  );
}
