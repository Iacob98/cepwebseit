"use client";

import { AdminForm } from "@/components/admin/AdminForm";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import type { TeamMember } from "@/types";

interface TeamMemberFormProps {
  action: (prevState: { success?: boolean; error?: string } | null, formData: FormData) => Promise<{ success?: boolean; error?: string }>;
  member?: TeamMember;
}

export function TeamMemberForm({ action, member }: TeamMemberFormProps) {
  return (
    <AdminForm action={action} backHref="/admin/team">
      {member?.id && <input type="hidden" name="id" value={member.id} />}
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input name="name" label="Name" defaultValue={member?.name} required />
          <Input name="role" label="Rolle" defaultValue={member?.role} required />
        </div>
        <Textarea name="description" label="Beschreibung" defaultValue={member?.description} required rows={4} />
      </div>
    </AdminForm>
  );
}
