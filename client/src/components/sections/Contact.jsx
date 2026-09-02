import { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { FiSend, FiMail, FiPhone, FiMapPin } from 'react-icons/fi';
import Container from '../ui/Container';
import SectionHeading from '../ui/SectionHeading';
import GlassCard from '../ui/GlassCard';
import { sendContactMessage } from '../../services/api';
import { usePortfolio } from '../../context/PortfolioContext';

const initialForm = { name: '', email: '', subject: '', message: '' };

const Contact = () => {
  const { profile } = usePortfolio();
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = 'Name is required';
    if (!form.email.trim()) next.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = 'Enter a valid email';
    if (!form.subject.trim()) next.subject = 'Subject is required';
    if (!form.message.trim() || form.message.trim().length < 10)
      next.message = 'Message should be at least 10 characters';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    try {
      await sendContactMessage(form);
      toast.success("Message sent — I'll get back to you soon!");
      setForm(initialForm);
      setErrors({});
    } catch (err) {
      const msg = err?.response?.data?.message || 'Something went wrong. Please try again.';
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass = (field) =>
    `w-full bg-base-900 border ${
      errors[field] ? 'border-red-400/60' : 'border-base-600'
    } rounded-xl px-4 py-3 text-ink-100 placeholder:text-ink-600 focus:border-brand-purple/60 outline-none transition-colors`;

  return (
    <section id="contact" className="py-24 relative">
      <Container>
        <SectionHeading
          eyebrow="Contact"
          title="Let's build something together"
          subtitle="Have an opportunity, a project, or just want to say hi? My inbox is open."
        />

        <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            className="space-y-5"
          >
            <GlassCard className="p-6 flex items-center gap-4">
              <div className="w-11 h-11 rounded-xl bg-grad-primary flex items-center justify-center text-white shrink-0">
                <FiMail size={18} />
              </div>
              <div>
                <p className="text-xs text-ink-400 uppercase tracking-wider">Email</p>
                <a href={profile.socials.email} className="text-ink-100 hover:text-brand-cyan transition-colors">
                  {profile.email}
                </a>
              </div>
            </GlassCard>
            <GlassCard className="p-6 flex items-center gap-4">
              <div className="w-11 h-11 rounded-xl bg-grad-primary flex items-center justify-center text-white shrink-0">
                <FiPhone size={18} />
              </div>
              <div>
                <p className="text-xs text-ink-400 uppercase tracking-wider">Phone</p>
                <a href={profile.socials.phone} className="text-ink-100 hover:text-brand-cyan transition-colors">
                  {profile.phone}
                </a>
              </div>
            </GlassCard>
            <GlassCard className="p-6 flex items-center gap-4">
              <div className="w-11 h-11 rounded-xl bg-grad-primary flex items-center justify-center text-white shrink-0">
                <FiMapPin size={18} />
              </div>
              <div>
                <p className="text-xs text-ink-400 uppercase tracking-wider">Location</p>
                <p className="text-ink-100">{profile.location}</p>
              </div>
            </GlassCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
          >
            <GlassCard className="p-6 sm:p-8" hover={false}>
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className="block text-sm text-ink-400 mb-1.5">
                      Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      className={inputClass('name')}
                    />
                    {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm text-ink-400 mb-1.5">
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className={inputClass('email')}
                    />
                    {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm text-ink-400 mb-1.5">
                    Subject
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="What's this about?"
                    className={inputClass('subject')}
                  />
                  {errors.subject && <p className="text-red-400 text-xs mt-1">{errors.subject}</p>}
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm text-ink-400 mb-1.5">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell me a bit about it..."
                    className={inputClass('message')}
                  />
                  {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-gradient text-white font-semibold px-7 py-3.5 rounded-full inline-flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <FiSend /> {submitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </GlassCard>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

export default Contact;
