import getTransporter from '../config/mailer.js';
import asyncHandler from '../middleware/asyncHandler.js';
import { buildContactEmailHtml } from '../utils/emailTemplate.js';
import supabase from '../lib/supabase.js';

// @desc    Save a contact message and send a notification email
// @route   POST /api/contact
// @access  Public
export const createMessage = asyncHandler(async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!supabase) {
    res.status(503);
    throw new Error('Contact storage is not configured');
  }

  const { data: saved, error: insertError } = await supabase
    .from('contact_messages')
    .insert({ name, email, subject, message })
    .select('id')
    .single();

  if (insertError) {
    console.error('Failed to store contact message:', insertError.message);
    res.status(503);
    throw new Error('Unable to save your message. Please try again later.');
  }

  // Attempt to send email, but never fail the request just because email delivery failed —
  // the message is already safely stored in Supabase.
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
    } catch (err) {
      console.error('✉️  Failed to send notification email:', err.message);
    }
  }

  res.status(201).json({
    success: true,
    message: 'Your message has been sent successfully!',
    data: { id: saved.id },
  });
});

// @desc    Get all stored messages (newest first)
// @route   GET /api/messages
// @access  Private (requires a Supabase Auth admin session)
export const getMessages = asyncHandler(async (req, res) => {
  if (!supabase) {
    res.status(503);
    throw new Error('Contact storage is not configured');
  }

  const { data: messages, error } = await supabase
    .from('contact_messages')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Failed to retrieve contact messages:', error.message);
    res.status(503);
    throw new Error('Unable to retrieve messages');
  }

  res.status(200).json({ success: true, count: messages.length, data: messages });
});

// @desc    Delete a message by id
// @route   DELETE /api/messages/:id
// @access  Private (requires a Supabase Auth admin session)
export const deleteMessage = asyncHandler(async (req, res) => {
  if (!supabase) {
    res.status(503);
    throw new Error('Contact storage is not configured');
  }

  const { data: deleted, error } = await supabase
    .from('contact_messages')
    .delete()
    .eq('id', req.params.id)
    .select('id')
    .maybeSingle();

  if (error) {
    console.error('Failed to delete contact message:', error.message);
    res.status(503);
    throw new Error('Unable to delete message');
  }

  if (!deleted) {
    res.status(404);
    throw new Error('Message not found');
  }

  res.status(200).json({ success: true, message: 'Message deleted', data: { id: req.params.id } });
});
