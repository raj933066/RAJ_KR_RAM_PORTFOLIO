import { motion } from 'framer-motion';

const SkillBar = ({ name, level }) => (
  <div>
    <div className="flex justify-between items-center mb-1.5">
      <span className="text-sm text-ink-200 font-medium">{name}</span>
      <span className="text-xs text-ink-400 font-mono">{level}%</span>
    </div>
    <div className="progress-track">
      <motion.div
        className="progress-fill"
        initial={{ width: 0 }}
        whileInView={{ width: `${level}%` }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 1, ease: 'easeOut' }}
      />
    </div>
  </div>
);

export default SkillBar;
