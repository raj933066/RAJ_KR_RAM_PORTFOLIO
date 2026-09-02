/**
 * Builds a simple, inbox-safe HTML email notifying the site owner of a new contact message.
 */
export const buildContactEmailHtml = ({ name, email, subject, message }) => `
  <div style="font-family: Arial, Helvetica, sans-serif; max-width: 560px; margin: 0 auto; padding: 24px; background:#0a0e1a; color:#e2e8f0; border-radius: 12px;">
    <h2 style="color:#a78bfa; margin-bottom: 4px;">New portfolio contact message</h2>
    <p style="color:#94a3b8; margin-top: 0;">You received a new message from your portfolio site.</p>
    <table style="width:100%; border-collapse: collapse; margin-top: 16px;">
      <tr>
        <td style="padding: 8px 0; color:#94a3b8; width: 90px;">Name</td>
        <td style="padding: 8px 0; color:#f1f5f9;">${escapeHtml(name)}</td>
      </tr>
      <tr>
        <td style="padding: 8px 0; color:#94a3b8;">Email</td>
        <td style="padding: 8px 0; color:#f1f5f9;">${escapeHtml(email)}</td>
      </tr>
      <tr>
        <td style="padding: 8px 0; color:#94a3b8;">Subject</td>
        <td style="padding: 8px 0; color:#f1f5f9;">${escapeHtml(subject)}</td>
      </tr>
    </table>
    <div style="margin-top: 16px; padding: 16px; background: rgba(255,255,255,0.05); border-radius: 8px;">
      <p style="white-space: pre-wrap; margin: 0; color:#e2e8f0;">${escapeHtml(message)}</p>
    </div>
  </div>
`;

function escapeHtml(str = '') {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
