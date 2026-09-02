import { motion } from 'framer-motion';
import { FiBriefcase } from 'react-icons/fi';
import Container from '../ui/Container';
import SectionHeading from '../ui/SectionHeading';
import GlassCard from '../ui/GlassCard';
import { usePortfolio } from '../../context/PortfolioContext';

const Experience = () => {
  const { experience } = usePortfolio();
  return (
  <section id="experience" className="py-24 relative">
    <Container>
      <SectionHeading eyebrow="Experience" title="Where I stand right now" />

      <div className="relative max-w-3xl mx-auto">
        <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-brand-indigo via-brand-purple to-transparent" />

        {experience.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="relative pl-16 pb-8 last:pb-0"
          >
            <div className="absolute left-0 top-0 w-12 h-12 rounded-full glass-strong flex items-center justify-center text-brand-cyan">
              <FiBriefcase size={18} />
            </div>
            <GlassCard className="p-6" hover={false}>
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <h3 className="text-lg font-semibold text-ink-100">{item.role}</h3>
                <span className="text-xs font-mono text-brand-cyan uppercase tracking-wider">
                  {item.period}
                </span>
              </div>
              <p className="text-sm text-ink-400 mb-3">{item.company}</p>
              <ul className="space-y-1.5">
                {item.points.map((point) => (
                  <li key={point} className="text-ink-400 text-sm flex gap-2">
                    <span className="text-brand-purple mt-1">▹</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </Container>
  </section>
  );
};

export default Experience;
