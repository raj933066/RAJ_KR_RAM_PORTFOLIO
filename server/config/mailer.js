import nodemailer from 'nodemailer';

let transporter = null;

export const getTransporter = () => {
  if (transporter) return transporter;

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    console.warn('⚠️  SMTP credentials are not fully set. Emails will not be sent until .env is configured.');
    return null;
  }

  if (SMTP_HOST.includes('@')) {
    throw new Error('SMTP_HOST must be a mail server hostname such as smtp.gmail.com, not an email address.');
  }

  transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT) || 587,
    secure: Number(SMTP_PORT) === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  return transporter;
};

export default getTransporter;
