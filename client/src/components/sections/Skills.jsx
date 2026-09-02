import { motion } from 'framer-motion';
import Container from '../ui/Container';
import SectionHeading from '../ui/SectionHeading';
import GlassCard from '../ui/GlassCard';
import SkillBar from '../ui/SkillBar';
import { usePortfolio } from '../../context/PortfolioContext';

const Skills = () => {
  const { skills: skillRows } = usePortfolio();
  const skills = skillRows.reduce((groups, skill) => ({ ...groups, [skill.category]: [...(groups[skill.category] || []), { ...skill, name: skill.name, level: skill.proficiency }] }), {});
  return (
  <section id="skills" className="py-24 relative">
    <Container>
      <SectionHeading
        eyebrow="Skills"
        title="Technologies I work with"
        subtitle="A snapshot of the languages, frameworks, and tools I use to ship full-stack applications."
      />

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(skills).map(([category, items], idx) => (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: (idx % 3) * 0.08 }}
          >
            <GlassCard className="p-6 h-full">
              <h3 className="text-lg font-semibold text-ink-100 mb-5">{category}</h3>
              <div className="space-y-4">
                {items.map((skill) => (
                  <SkillBar key={skill.name} name={skill.name} level={skill.level} />
                ))}
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </Container>
  </section>
  );
};

export default Skills;
