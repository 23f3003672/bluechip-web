import { Resend } from "resend";

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const DEFAULT_RECIPIENT = process.env.NOTIFICATION_RECIPIENT_EMAIL || "info@bluechiptechno.com";
const DEFAULT_FROM = process.env.RESEND_FROM_EMAIL || "Bluechip Website <onboarding@resend.dev>";

// Lazy initialize Resend client
function getResendClient() {
  if (!RESEND_API_KEY) {
    console.warn(
      "[Resend Email] RESEND_API_KEY is not configured in environment variables. Email notification will be skipped."
    );
    return null;
  }
  return new Resend(RESEND_API_KEY);
}

export interface ContactInquiryNotificationData {
  name: string;
  email: string;
  phone?: string | null;
  company_name?: string | null;
  service?: string | null;
  location?: string | null;
  message: string;
  submittedAt?: Date;
}

export interface JobApplicationNotificationData {
  name: string;
  email: string;
  phone: string;
  job_title?: string | null;
  resume_url: string;
  cover_letter?: string | null;
  submittedAt?: Date;
}

/**
 * Send internal notification email for a new Contact Inquiry to info@bluechiptechno.com
 */
export async function sendContactInquiryNotificationEmail(data: ContactInquiryNotificationData) {
  try {
    const resend = getResendClient();
    if (!resend) {
      return { success: false, error: "RESEND_API_KEY not configured" };
    }

    const recipient = DEFAULT_RECIPIENT;
    const dateFormatted = (data.submittedAt || new Date()).toLocaleString("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    });

    const subject = `🔔 New Website Inquiry: ${data.name}${data.company_name ? ` (${data.company_name})` : ""}`;

    const textContent = `
New Contact Inquiry Received - Bluechip Engineering & Technologies
------------------------------------------------------------------
Date: ${dateFormatted}
Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone || "Not provided"}
Company: ${data.company_name || "Not provided"}
Service Requested: ${data.service || "General Inquiry"}
Location: ${data.location || "Not provided"}

Message:
${data.message}

------------------------------------------------------------------
To reply to the client, simply reply to this email or write directly to ${data.email}.
    `.trim();

    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(subject)}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f1f5f9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1e293b;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="min-width: 100%; background-color: #f1f5f9; padding: 32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -2px rgba(0, 0, 0, 0.05); border: 1px solid #e2e8f0;">
          
          <!-- Header -->
          <tr>
            <td style="background-color: #0f172a; padding: 28px 32px; border-bottom: 3px solid #2563eb;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <span style="font-size: 11px; font-weight: 700; letter-spacing: 1.5px; color: #38bdf8; text-transform: uppercase; display: block; margin-bottom: 6px;">
                      BLUECHIP ENGINEERING & TECHNOLOGIES
                    </span>
                    <h1 style="margin: 0; font-size: 20px; font-weight: 700; color: #ffffff;">
                      New Contact Inquiry
                    </h1>
                  </td>
                  <td align="right" valign="top">
                    <span style="background-color: #1e293b; color: #94a3b8; font-size: 12px; padding: 6px 12px; border-radius: 9999px; border: 1px solid #334155; white-space: nowrap;">
                      ${dateFormatted}
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Main Content -->
          <tr>
            <td style="padding: 32px;">
              <div style="background-color: #eff6ff; border-left: 4px solid #2563eb; padding: 14px 18px; border-radius: 6px; margin-bottom: 28px;">
                <p style="margin: 0; font-size: 14px; color: #1e40af; font-weight: 500;">
                  A new client message was submitted through the website contact form.
                </p>
              </div>

              <!-- Details Table -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 28px; border-collapse: collapse;">
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; width: 35%; font-size: 13px; font-weight: 600; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px;">Client Name</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-size: 15px; font-weight: 600; color: #0f172a;">${escapeHtml(data.name)}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-size: 13px; font-weight: 600; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px;">Email Address</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-size: 15px; color: #2563eb;">
                    <a href="mailto:${escapeHtml(data.email)}" style="color: #2563eb; text-decoration: none; font-weight: 500;">${escapeHtml(data.email)}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-size: 13px; font-weight: 600; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px;">Phone Number</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-size: 15px; color: #0f172a;">
                    ${data.phone ? `<a href="tel:${escapeHtml(data.phone)}" style="color: #0f172a; text-decoration: none;">${escapeHtml(data.phone)}</a>` : '<span style="color: #94a3b8; font-style: italic;">Not provided</span>'}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-size: 13px; font-weight: 600; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px;">Company</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-size: 15px; color: #0f172a;">
                    ${data.company_name ? escapeHtml(data.company_name) : '<span style="color: #94a3b8; font-style: italic;">Not provided</span>'}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-size: 13px; font-weight: 600; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px;">Service</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-size: 15px; color: #0f172a;">
                    <span style="background-color: #f1f5f9; color: #334155; padding: 4px 10px; border-radius: 6px; font-size: 13px; font-weight: 500;">
                      ${escapeHtml(data.service || "General Inquiry")}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-size: 13px; font-weight: 600; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px;">Location</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-size: 15px; color: #0f172a;">
                    ${data.location ? escapeHtml(data.location) : '<span style="color: #94a3b8; font-style: italic;">Not provided</span>'}
                  </td>
                </tr>
              </table>

              <!-- Message Block -->
              <div style="margin-bottom: 28px;">
                <span style="display: block; font-size: 12px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 8px;">
                  Inquiry Message:
                </span>
                <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 18px; font-size: 15px; line-height: 1.6; color: #334155; white-space: pre-wrap;">
                  ${escapeHtml(data.message)}
                </div>
              </div>

              <!-- Quick Action / Reply Tip -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center" style="padding-top: 10px;">
                    <a href="mailto:${escapeHtml(data.email)}" style="display: inline-block; background-color: #2563eb; color: #ffffff; text-decoration: none; padding: 12px 28px; border-radius: 6px; font-size: 14px; font-weight: 600;">
                      Reply Directly to Client (${escapeHtml(data.email)})
                    </a>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f8fafc; border-top: 1px solid #e2e8f0; padding: 20px 32px; text-align: center;">
              <p style="margin: 0; font-size: 12px; color: #64748b;">
                This is an automated notification sent from <strong>Bluechip Engineering & Technologies</strong> website.
              </p>
              <p style="margin: 4px 0 0; font-size: 11px; color: #94a3b8;">
                Recipient: ${recipient} &bull; Reply-To: ${escapeHtml(data.email)}
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `.trim();

    const response = await resend.emails.send({
      from: DEFAULT_FROM,
      to: [recipient],
      replyTo: data.email,
      subject,
      text: textContent,
      html: htmlContent,
    });

    if (response.error) {
      console.error("[Resend Email] Failed to send contact inquiry email:", response.error);
      return { success: false, error: response.error.message };
    }

    return { success: true, id: response.data?.id };
  } catch (err: any) {
    console.error("[Resend Email] Unexpected error while sending contact inquiry email:", err);
    return { success: false, error: err?.message || "Failed to send email" };
  }
}

/**
 * Send internal notification email for a new Job Application to info@bluechiptechno.com
 */
export async function sendJobApplicationNotificationEmail(data: JobApplicationNotificationData) {
  try {
    const resend = getResendClient();
    if (!resend) {
      return { success: false, error: "RESEND_API_KEY not configured" };
    }

    const recipient = DEFAULT_RECIPIENT;
    const dateFormatted = (data.submittedAt || new Date()).toLocaleString("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    });

    const jobTitle = data.job_title || "General Application";
    const subject = `💼 New Career Application: ${data.name} - ${jobTitle}`;

    const textContent = `
New Job Application Received - Bluechip Engineering & Technologies
------------------------------------------------------------------
Date: ${dateFormatted}
Candidate Name: ${data.name}
Applied Position: ${jobTitle}
Email: ${data.email}
Phone: ${data.phone}
Resume Link: ${data.resume_url}

${data.cover_letter ? `Cover Letter / Notes:\n${data.cover_letter}\n` : ""}
------------------------------------------------------------------
To reply to the applicant, simply reply to this email or write directly to ${data.email}.
    `.trim();

    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(subject)}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f1f5f9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1e293b;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="min-width: 100%; background-color: #f1f5f9; padding: 32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -2px rgba(0, 0, 0, 0.05); border: 1px solid #e2e8f0;">
          
          <!-- Header -->
          <tr>
            <td style="background-color: #0f172a; padding: 28px 32px; border-bottom: 3px solid #10b981;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <span style="font-size: 11px; font-weight: 700; letter-spacing: 1.5px; color: #34d399; text-transform: uppercase; display: block; margin-bottom: 6px;">
                      BLUECHIP CAREERS
                    </span>
                    <h1 style="margin: 0; font-size: 20px; font-weight: 700; color: #ffffff;">
                      New Job Application
                    </h1>
                  </td>
                  <td align="right" valign="top">
                    <span style="background-color: #1e293b; color: #94a3b8; font-size: 12px; padding: 6px 12px; border-radius: 9999px; border: 1px solid #334155; white-space: nowrap;">
                      ${dateFormatted}
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Main Content -->
          <tr>
            <td style="padding: 32px;">
              <div style="background-color: #ecfdf5; border-left: 4px solid #10b981; padding: 14px 18px; border-radius: 6px; margin-bottom: 28px;">
                <p style="margin: 0; font-size: 14px; color: #065f46; font-weight: 500;">
                  A candidate has submitted their resume for <strong>${escapeHtml(jobTitle)}</strong>.
                </p>
              </div>

              <!-- Candidate Table -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 28px; border-collapse: collapse;">
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; width: 35%; font-size: 13px; font-weight: 600; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px;">Candidate Name</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-size: 15px; font-weight: 600; color: #0f172a;">${escapeHtml(data.name)}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-size: 13px; font-weight: 600; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px;">Applied Position</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-size: 15px; font-weight: 600; color: #0f172a;">
                    <span style="background-color: #eff6ff; color: #1d4ed8; padding: 4px 10px; border-radius: 6px; font-size: 13px;">
                      ${escapeHtml(jobTitle)}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-size: 13px; font-weight: 600; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px;">Email Address</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-size: 15px; color: #2563eb;">
                    <a href="mailto:${escapeHtml(data.email)}" style="color: #2563eb; text-decoration: none; font-weight: 500;">${escapeHtml(data.email)}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-size: 13px; font-weight: 600; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px;">Phone Number</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-size: 15px; color: #0f172a;">
                    <a href="tel:${escapeHtml(data.phone)}" style="color: #0f172a; text-decoration: none; font-weight: 500;">${escapeHtml(data.phone)}</a>
                  </td>
                </tr>
              </table>

              <!-- Resume Button -->
              <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px; text-align: center; margin-bottom: 28px;">
                <span style="display: block; font-size: 12px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 12px;">
                  Candidate Resume Document
                </span>
                <a href="${escapeHtml(data.resume_url)}" target="_blank" rel="noopener noreferrer" style="display: inline-block; background-color: #0f172a; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 6px; font-size: 14px; font-weight: 600;">
                  📄 View / Download Resume PDF
                </a>
              </div>

              ${
                data.cover_letter
                  ? `
              <!-- Cover Letter / Notes -->
              <div style="margin-bottom: 28px;">
                <span style="display: block; font-size: 12px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 8px;">
                  Cover Letter / Notes:
                </span>
                <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 18px; font-size: 14px; line-height: 1.6; color: #334155; white-space: pre-wrap;">
                  ${escapeHtml(data.cover_letter)}
                </div>
              </div>
              `
                  : ""
              }

              <!-- Reply Action -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center" style="padding-top: 10px;">
                    <a href="mailto:${escapeHtml(data.email)}" style="display: inline-block; background-color: #2563eb; color: #ffffff; text-decoration: none; padding: 12px 28px; border-radius: 6px; font-size: 14px; font-weight: 600;">
                      Reply to Candidate (${escapeHtml(data.email)})
                    </a>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f8fafc; border-top: 1px solid #e2e8f0; padding: 20px 32px; text-align: center;">
              <p style="margin: 0; font-size: 12px; color: #64748b;">
                This is an automated notification sent from <strong>Bluechip Engineering & Technologies</strong> website.
              </p>
              <p style="margin: 4px 0 0; font-size: 11px; color: #94a3b8;">
                Recipient: ${recipient} &bull; Reply-To: ${escapeHtml(data.email)}
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `.trim();

    const response = await resend.emails.send({
      from: DEFAULT_FROM,
      to: [recipient],
      replyTo: data.email,
      subject,
      text: textContent,
      html: htmlContent,
    });

    if (response.error) {
      console.error("[Resend Email] Failed to send job application email:", response.error);
      return { success: false, error: response.error.message };
    }

    return { success: true, id: response.data?.id };
  } catch (err: any) {
    console.error("[Resend Email] Unexpected error while sending job application email:", err);
    return { success: false, error: err?.message || "Failed to send email" };
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
