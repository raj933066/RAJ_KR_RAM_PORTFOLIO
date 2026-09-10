import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { createMessage, getMessages, deleteMessage } from '../controllers/contactController.js';
import { contactValidationRules, validate } from '../middleware/validators.js';
import requireAdminKey from '../middleware/requireAdminKey.js';

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

// GET /api/messages (admin key required)
router.get('/messages', requireAdminKey, getMessages);

// DELETE /api/messages/:id (admin key required)
router.delete('/messages/:id', requireAdminKey, deleteMessage);

export default router;
