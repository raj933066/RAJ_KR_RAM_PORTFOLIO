import getTransporter from '../config/mailer.js';
import asyncHandler from '../middleware/asyncHandler.js';
import ContactMessage from '../models/ContactMessage.js';
import { buildContactEmailHtml } from '../utils/emailTemplate.js';

export const createMessage = asyncHandler(async (req, res) => {
  const { name, email, subject, message } = req.body;
  const saved = await ContactMessage.create({ name, email, subject, message });

  const transporter = getTransporter();
  if (transporter) {
    try {
      await transporter.sendMail({
        from: `"Portfolio Contact Form" <${process.env.SMTP_USER}>`,
        to: process.env.CONTACT_RECEIVER || process.env.SMTP_USER,
        replyTo: email,
        subject: `New message: ${subject}`,
        html: buildContactEmailHtml({ name, email, subject, message }),
      });
    } catch (error) {
      console.error('Failed to send notification email:', error.message);
    }
  }

  res.status(201).json({
    success: true,
    message: 'Your message has been sent successfully!',
    data: { id: saved._id },
  });
});

export const getMessages = asyncHandler(async (req, res) => {
  const messages = await ContactMessage.find().sort({ createdAt: -1 }).lean();
  res.status(200).json({ success: true, count: messages.length, data: messages });
});

export const deleteMessage = asyncHandler(async (req, res) => {
  const deleted = await ContactMessage.findByIdAndDelete(req.params.id);
  if (!deleted) {
    res.status(404);
    throw new Error('Message not found');
  }

  res.status(200).json({ success: true, message: 'Message deleted', data: { id: deleted._id } });
});
