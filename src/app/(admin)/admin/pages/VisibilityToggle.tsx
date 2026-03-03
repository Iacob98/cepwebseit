"use client";

import { useTransition } from "react";
import { Eye, EyeOff } from "lucide-react";
import { togglePageVisibilityAction } from "@/actions/admin/settings";

interface VisibilityToggleProps {
  slug: string;
  isHidden: boolean;
  isProtected: boolean;
}

export function VisibilityToggle({ slug, isHidden, isProtected }: VisibilityToggleProps) {
  const [isPending, startTransition] = useTransition();

  if (isProtected) {
    return (
      <span className="text-gray-300" title="Diese Seite kann nicht ausgeblendet werden">
        <Eye className="h-5 w-5 mx-auto" />
      </span>
    );
  }

  return (
    <button
      onClick={() => startTransition(async () => { await togglePageVisibilityAction(slug); })}
      disabled={isPending}
      className="inline-flex items-center justify-center rounded-lg p-1.5 transition-colors hover:bg-gray-100 disabled:opacity-50 cursor-pointer"
      title={isHidden ? "Seite einblenden" : "Seite ausblenden"}
    >
      {isHidden ? (
        <EyeOff className="h-5 w-5 text-amber-500" />
      ) : (
        <Eye className="h-5 w-5 text-green-600" />
      )}
    </button>
  );
}
