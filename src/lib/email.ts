import nodemailer from "nodemailer";
import { getEmailSettings } from "@/lib/dal";

function createTransporter() {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) return null;

  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT) || 587,
    secure: Number(SMTP_PORT) === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });
}

export async function sendNotificationEmail(
  subject: string,
  htmlBody: string
): Promise<void> {
  const transporter = createTransporter();
  if (!transporter) {
    console.warn("[Email] SMTP not configured — skipping email send");
    return;
  }

  try {
    const from = process.env.SMTP_FROM || process.env.SMTP_USER!;
    const to = process.env.NOTIFY_EMAIL || process.env.SMTP_USER!;
    await transporter.sendMail({ from, to, subject, html: htmlBody });
  } catch (error) {
    console.error("[Email] Failed to send notification:", error);
  }
}

export async function sendAutoReply(
  toEmail: string,
  customerName: string
): Promise<void> {
  const transporter = createTransporter();
  if (!transporter) return;

  const from = process.env.SMTP_FROM || process.env.SMTP_USER!;
  const s = await getEmailSettings();

  const logoHtml = s.logo
    ? `<img src="${s.logo}" alt="${s.headerTitle}" style="max-height:48px;margin:0 auto 12px;display:block" />`
    : "";

  const contactRows = [
    s.contactPhone ? `<tr><td style="padding:6px 16px 6px 0;color:#666;font-size:14px">Telefon:</td><td style="padding:6px 0;font-size:14px;font-weight:600;color:#333">${s.contactPhone}</td></tr>` : "",
    s.contactEmail ? `<tr><td style="padding:6px 16px 6px 0;color:#666;font-size:14px">E-Mail:</td><td style="padding:6px 0;font-size:14px;font-weight:600;color:#333">${s.contactEmail}</td></tr>` : "",
  ].filter(Boolean).join("");

  const contactBlock = contactRows
    ? `<p style="color:#333;font-size:15px;line-height:1.6;margin:0 0 24px">In der Zwischenzeit können Sie uns jederzeit erreichen:</p><table cellpadding="0" cellspacing="0" style="margin:0 0 24px">${contactRows}</table>`
    : "";

  const footerHtml = s.footerText
    ? `<tr><td style="background:#f8f9fa;padding:24px 40px;border-top:1px solid #e9ecef"><p style="color:#999;font-size:12px;margin:0;text-align:center">${s.footerText}</p></td></tr>`
    : "";

  const html = `
<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#f4f6f8;font-family:Arial,Helvetica,sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f6f8;padding:40px 20px">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08)">
          <tr>
            <td style="background:${s.headerColor};padding:32px 40px;text-align:center">
              ${logoHtml}
              <h1 style="color:#ffffff;margin:0;font-size:24px;font-weight:700">${s.headerTitle}</h1>
              ${s.headerSubtitle ? `<p style="color:rgba(255,255,255,0.85);margin:8px 0 0;font-size:14px">${s.headerSubtitle}</p>` : ""}
            </td>
          </tr>
          <tr>
            <td style="padding:40px">
              <h2 style="color:${s.headerColor};margin:0 0 16px;font-size:20px">${s.greeting}</h2>
              <p style="color:#333;font-size:15px;line-height:1.6;margin:0 0 16px">Guten Tag ${customerName},</p>
              <p style="color:#333;font-size:15px;line-height:1.6;margin:0 0 16px">${s.bodyText}</p>
              ${contactBlock}
              <p style="color:#333;font-size:15px;line-height:1.6;margin:0">Mit freundlichen Grüßen,<br><strong>${s.closing}</strong></p>
            </td>
          </tr>
          ${footerHtml}
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  try {
    await transporter.sendMail({
      from,
      to: toEmail,
      subject: s.subject,
      html,
    });
  } catch (error) {
    console.error("[Email] Failed to send auto-reply:", error);
  }
}
