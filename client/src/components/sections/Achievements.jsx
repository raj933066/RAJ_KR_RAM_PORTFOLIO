import { motion } from 'framer-motion';
import { FiCode, FiAward, FiFileText, FiTrendingUp } from 'react-icons/fi';
import Container from '../ui/Container';
import SectionHeading from '../ui/SectionHeading';
import GlassCard from '../ui/GlassCard';
import { usePortfolio } from '../../context/PortfolioContext';

const iconMap = {
  code: FiCode,
  trophy: FiAward,
  certificate: FiFileText,
  streak: FiTrendingUp,
};

const Achievements = () => {
  const { achievements } = usePortfolio();
  return (
  <section id="achievements" className="py-24 relative">
    <Container>
      <SectionHeading eyebrow="Achievements" title="Milestones along the way" />

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {achievements.map((item, idx) => {
          const Icon = iconMap[item.icon] || FiAward;
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
            >
              <GlassCard className="p-6 h-full text-center">
                <div className="w-14 h-14 mx-auto rounded-2xl bg-grad-primary flex items-center justify-center text-white mb-4">
                  <Icon size={22} />
                </div>
                <h3 className="font-semibold text-ink-100 mb-2">{item.title}</h3>
                <p className="text-sm text-ink-400 leading-relaxed">{item.detail}</p>
              </GlassCard>
            </motion.div>
            );
          })}
      </div>
    </Container>
  </section>
);
};

export default Achievements;
