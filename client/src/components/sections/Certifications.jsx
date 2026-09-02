import { motion } from 'framer-motion';
import { FiCheckCircle } from 'react-icons/fi';
import Container from '../ui/Container';
import SectionHeading from '../ui/SectionHeading';
import GlassCard from '../ui/GlassCard';
import { usePortfolio } from '../../context/PortfolioContext';

const Certifications = () => {
  const { certifications } = usePortfolio();
  return (
  <section id="certifications" className="py-24 relative">
    <Container>
      <SectionHeading eyebrow="Certifications" title="Courses & credentials" />

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {certifications.map((cert, idx) => (
          <motion.div
            key={cert.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: idx * 0.08 }}
          >
            <GlassCard className="overflow-hidden h-full flex flex-col">
              <div className="h-36 overflow-hidden">
                <img
                  src={cert.image}
                  alt={cert.name}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-5 flex flex-col flex-1">
                <h3 className="font-semibold text-ink-100 mb-1">{cert.name}</h3>
                <p className="text-sm text-ink-400 mb-1">{cert.org}</p>
                <p className="text-xs font-mono text-brand-cyan mb-4">{cert.date}</p>
                <a
                  href={cert.verifyUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-auto inline-flex items-center gap-2 text-sm font-medium text-ink-100 hover:text-brand-cyan transition-colors"
                >
                  <FiCheckCircle size={15} /> Verify
                </a>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </Container>
  </section>
  );
};

export default Certifications;
