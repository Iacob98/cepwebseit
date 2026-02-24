import { getEmailSettings } from "@/lib/dal";
import { updateEmailSettingsAction } from "@/actions/admin/email-settings";
import { EmailSettingsForm } from "./EmailSettingsForm";

export default async function EmailSettingsPage() {
  const settings = await getEmailSettings();

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">E-Mail Vorlage bearbeiten</h1>
      <EmailSettingsForm settings={settings} action={updateEmailSettingsAction} />
    </div>
  );
}
