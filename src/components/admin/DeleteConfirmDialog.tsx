"use client";

import { useTransition } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/AlertDialog";

interface DeleteConfirmDialogProps {
  onDelete: () => Promise<void>;
  itemName?: string;
}

export function DeleteConfirmDialog({ onDelete, itemName = "diesen Eintrag" }: DeleteConfirmDialogProps) {
  const [pending, startTransition] = useTransition();

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button
          type="button"
          className="rounded-lg border border-red-200 px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
        >
          Löschen
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogTitle>Löschen bestätigen</AlertDialogTitle>
        <AlertDialogDescription>
          Möchten Sie {itemName} wirklich löschen? Diese Aktion kann nicht rückgängig gemacht werden.
        </AlertDialogDescription>
        <div className="mt-6 flex justify-end gap-3">
          <AlertDialogCancel>Abbrechen</AlertDialogCancel>
          <AlertDialogAction
            disabled={pending}
            onClick={(e) => {
              e.preventDefault();
              startTransition(async () => {
                await onDelete();
              });
            }}
          >
            {pending ? "Wird gelöscht..." : "Löschen"}
          </AlertDialogAction>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
