import type { EmailMessage } from "./provider";

// Escape text that comes from outside (like the browser's user agent)
function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function layout(title: string, body: string) {
  return `<div style="font-family:Arial,sans-serif;max-width:480px;margin:auto;padding:24px;color:#0f172a">
    <h2 style="color:#4f46e5;margin:0 0 16px">LeadNexa</h2>
    <h3 style="margin:0 0 12px">${title}</h3>
    ${body}
  </div>`;
}

function button(url: string, label: string) {
  return `<p style="margin:24px 0"><a href="${url}" style="background:#4f46e5;color:#fff;padding:12px 24px;border-radius:999px;text-decoration:none">${label}</a></p>`;
}

export function verificationEmail(to: string, url: string): EmailMessage {
  return {
    to,
    subject: "Verify your email for LeadNexa",
    text: `Verify your email by opening this link: ${url}`,
    html: layout(
      "Verify your email",
      `<p>Click the button to confirm this email address.</p>${button(url, "Verify email")}
       <p style="color:#64748b;font-size:13px">If you did not create an account, you can ignore this email.</p>`
    ),
  };
}

export function resetPasswordEmail(to: string, url: string): EmailMessage {
  return {
    to,
    subject: "Reset your LeadNexa password",
    text: `Reset your password: ${url}`,
    html: layout(
      "Reset your password",
      `<p>Click the button to choose a new password. The link expires soon.</p>${button(url, "Reset password")}
       <p style="color:#64748b;font-size:13px">If you did not ask for this, ignore this email.</p>`
    ),
  };
}

export function loginAlertEmail(
  to: string,
  info: { time: Date; userAgent?: string | null; ip?: string | null }
): EmailMessage {
  const time = info.time.toUTCString();
  const device = info.userAgent ?? "Unknown device";
  const ip = info.ip ?? "Unknown";
  return {
    to,
    subject: "New login to your LeadNexa account",
    text: `You logged in to LeadNexa with this email at ${time}. Device: ${device}. IP: ${ip}. If this was not you, reset your password now.`,
    html: layout(
      "You logged in to LeadNexa",
      `<p>You are logged in to LeadNexa using this email.</p>
       <p style="color:#64748b;font-size:14px">Time: ${escapeHtml(time)}<br/>Device: ${escapeHtml(device)}<br/>IP: ${escapeHtml(ip)}</p>
       <p>If this was not you, reset your password immediately.</p>`
    ),
  };
}