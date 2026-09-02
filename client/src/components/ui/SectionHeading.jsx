import { motion } from 'framer-motion';

const SectionHeading = ({ eyebrow, title, subtitle, align = 'center' }) => {
  const isCenter = align === 'center';
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`mb-14 ${isCenter ? 'text-center mx-auto max-w-2xl' : 'text-left'}`}
    >
      {eyebrow && (
        <span className="inline-block text-sm font-mono tracking-widest uppercase text-brand-cyan mb-3">
          {eyebrow}
        </span>
      )}
      <h2 className="text-3xl sm:text-4xl font-bold text-ink-100 mb-4">{title}</h2>
      {subtitle && <p className="text-ink-400 text-base sm:text-lg leading-relaxed">{subtitle}</p>}
    </motion.div>
  );
};

export default SectionHeading;
