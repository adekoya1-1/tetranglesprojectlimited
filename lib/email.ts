import { Resend } from "resend";
import type { InquiryInput } from "@/lib/validations";

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM = process.env.EMAIL_FROM ?? "noreply@tetrangles.com.ng";
const TO = process.env.EMAIL_TO ?? "tetrangleprojects@gmail.com";

export async function sendInquiryNotification(
  inquiry: InquiryInput & { id: string }
): Promise<void> {
  const subject = `New Project Enquiry — ${inquiry.name}`;

  const html = `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto;">
      <div style="background:#1C1C1C;padding:24px 32px;">
        <div style="display:flex;align-items:center;gap:12px;">
          <div style="display:flex;gap:3px;">
            <span style="display:block;height:28px;width:6px;background:#E03A1A;"></span>
            <span style="display:block;height:28px;width:6px;background:#E03A1A;opacity:0.65;"></span>
            <span style="display:block;height:28px;width:6px;background:#E03A1A;opacity:0.3;"></span>
          </div>
          <div>
            <p style="color:#fff;font-size:18px;font-weight:900;margin:0;text-transform:uppercase;letter-spacing:0.05em;">TETRANGLES</p>
            <p style="color:rgba(255,255,255,0.4);font-size:10px;margin:0;text-transform:uppercase;letter-spacing:0.2em;">Projects Limited</p>
          </div>
        </div>
      </div>

      <div style="background:#E03A1A;padding:16px 32px;">
        <h1 style="color:#fff;margin:0;font-size:20px;font-weight:900;text-transform:uppercase;letter-spacing:0.05em;">
          New Project Enquiry Received
        </h1>
      </div>

      <div style="padding:32px;background:#f5f5f5;">
        <table style="width:100%;border-collapse:collapse;">
          <tr>
            <td style="padding:10px 0;border-bottom:1px solid #e0e0e0;width:140px;">
              <strong style="font-size:11px;text-transform:uppercase;letter-spacing:0.1em;color:#6B7280;">Name</strong>
            </td>
            <td style="padding:10px 0;border-bottom:1px solid #e0e0e0;font-size:14px;color:#1C1C1C;">${inquiry.name}</td>
          </tr>
          <tr>
            <td style="padding:10px 0;border-bottom:1px solid #e0e0e0;">
              <strong style="font-size:11px;text-transform:uppercase;letter-spacing:0.1em;color:#6B7280;">Email</strong>
            </td>
            <td style="padding:10px 0;border-bottom:1px solid #e0e0e0;font-size:14px;">
              <a href="mailto:${inquiry.email}" style="color:#E03A1A;">${inquiry.email}</a>
            </td>
          </tr>
          <tr>
            <td style="padding:10px 0;border-bottom:1px solid #e0e0e0;">
              <strong style="font-size:11px;text-transform:uppercase;letter-spacing:0.1em;color:#6B7280;">Phone</strong>
            </td>
            <td style="padding:10px 0;border-bottom:1px solid #e0e0e0;font-size:14px;">
              <a href="tel:${inquiry.phone}" style="color:#E03A1A;">${inquiry.phone}</a>
            </td>
          </tr>
          ${inquiry.service ? `
          <tr>
            <td style="padding:10px 0;border-bottom:1px solid #e0e0e0;">
              <strong style="font-size:11px;text-transform:uppercase;letter-spacing:0.1em;color:#6B7280;">Service</strong>
            </td>
            <td style="padding:10px 0;border-bottom:1px solid #e0e0e0;font-size:14px;color:#1C1C1C;">${inquiry.service}</td>
          </tr>` : ""}
          ${inquiry.budget ? `
          <tr>
            <td style="padding:10px 0;border-bottom:1px solid #e0e0e0;">
              <strong style="font-size:11px;text-transform:uppercase;letter-spacing:0.1em;color:#6B7280;">Budget</strong>
            </td>
            <td style="padding:10px 0;border-bottom:1px solid #e0e0e0;font-size:14px;color:#1C1C1C;">${inquiry.budget}</td>
          </tr>` : ""}
          <tr>
            <td style="padding:10px 0;vertical-align:top;">
              <strong style="font-size:11px;text-transform:uppercase;letter-spacing:0.1em;color:#6B7280;">Message</strong>
            </td>
            <td style="padding:10px 0;font-size:14px;color:#1C1C1C;line-height:1.6;">${inquiry.message.replace(/\n/g, "<br>")}</td>
          </tr>
        </table>

        <div style="margin-top:24px;">
          <a href="${process.env.NEXTAUTH_URL ?? "http://localhost:3000"}/admin/inquiries/${inquiry.id}"
             style="display:inline-block;background:#E03A1A;color:#fff;padding:12px 24px;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;text-decoration:none;">
            View in Admin Dashboard
          </a>
        </div>
      </div>

      <div style="padding:16px 32px;background:#1C1C1C;text-align:center;">
        <p style="color:rgba(255,255,255,0.3);font-size:11px;margin:0;">
          © ${new Date().getFullYear()} Tetrangles Projects Limited · 8A, Road 26, Ikota Villa Estate, Lagos
        </p>
      </div>
    </div>
  `;

  await resend.emails.send({ from: FROM, to: TO, subject, html });
}
