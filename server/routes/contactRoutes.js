import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { createMessage, getMessages, deleteMessage } from '../controllers/contactController.js';
import { contactValidationRules, validate } from '../middleware/validators.js';
import requireSupabaseAdmin from '../middleware/requireSupabaseAdmin.js';

const router = Router();

// Limit contact submissions to avoid spam/abuse: 5 requests per 15 minutes per IP
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many messages sent. Please try again later.' },
});

// POST /api/contact
router.post('/contact', contactLimiter, contactValidationRules, validate, createMessage);

// GET /api/messages (Supabase Auth admin only)
router.get('/messages', requireSupabaseAdmin, getMessages);

// DELETE /api/messages/:id (Supabase Auth admin only)
router.delete('/messages/:id', requireSupabaseAdmin, deleteMessage);

export default router;
