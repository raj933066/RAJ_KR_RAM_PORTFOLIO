import { motion } from 'framer-motion';
import { FiCode, FiTarget, FiBookOpen } from 'react-icons/fi';
import Container from '../ui/Container';
import SectionHeading from '../ui/SectionHeading';
import GlassCard from '../ui/GlassCard';
import { usePortfolio } from '../../context/PortfolioContext';

const highlights = [
  { icon: FiBookOpen, label: 'Engineering Student' },
  { icon: FiCode, label: 'MERN Stack Developer' },
  { icon: FiTarget, label: 'DSA & Problem Solving' },
];

const About = () => {
  const { profile } = usePortfolio();
  return (
  <section id="about" className="py-24 relative">
    <Container>
      <SectionHeading eyebrow="About Me" title="A quick introduction" />

      <div className="grid lg:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <GlassCard className="p-8 h-full">
            <h3 className="text-xl font-semibold text-ink-100 mb-3">Personal Summary</h3>
            <p className="text-ink-400 leading-relaxed mb-6">{profile.summary}</p>
            <h3 className="text-xl font-semibold text-ink-100 mb-3">Career Objective</h3>
            <p className="text-ink-400 leading-relaxed">{profile.objective}</p>
          </GlassCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="grid gap-5"
        >
          {highlights.map(({ icon: Icon, label }) => (
            <GlassCard key={label} className="p-5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-grad-primary flex items-center justify-center text-white shrink-0">
                <Icon size={20} />
              </div>
              <span className="text-ink-100 font-medium">{label}</span>
            </GlassCard>
          ))}
          <GlassCard className="p-5">
            <p className="text-ink-400 text-sm leading-relaxed">
              Passionate about <span className="text-ink-100">continuous learning</span> — currently
              deepening my grasp of system design and exploring interests in software engineering
              beyond the classroom.
            </p>
          </GlassCard>
        </motion.div>
      </div>
    </Container>
  </section>
  );
};

export default About;
