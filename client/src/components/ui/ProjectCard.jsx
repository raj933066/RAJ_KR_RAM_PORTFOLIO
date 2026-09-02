import { motion } from 'framer-motion';
import { FiCode, FiGithub, FiExternalLink } from 'react-icons/fi';
import GlassCard from './GlassCard';

const ProjectCard = ({ project, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
  >
    <GlassCard className="overflow-hidden h-full flex flex-col group">
      <div className="relative h-48 overflow-hidden">
        {project.image ? (
          <>
            <img
              src={project.image}
              alt={project.name}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-base-900/90 via-transparent to-transparent" />
          </>
        ) : (
          <div className="w-full h-full bg-base-700 flex items-center justify-center text-brand-purple">
            <FiCode size={42} strokeWidth={1.5} />
          </div>
        )}
      </div>

      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-lg font-semibold text-ink-100 mb-2">{project.name}</h3>
        <p className="text-sm text-ink-400 mb-4 leading-relaxed">{project.description}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {project.tech.map((t) => (
            <span
              key={t}
              className="text-xs font-mono px-2.5 py-1 rounded-full bg-base-700 border border-base-600 text-brand-cyan"
            >
              {t}
            </span>
          ))}
        </div>

        <ul className="text-xs text-ink-400 space-y-1 mb-6">
          {project.features.slice(0, 3).map((f) => (
            <li key={f} className="flex gap-2">
              <span className="text-brand-purple">•</span>
              {f}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex gap-3">
          {project.github ? (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2 text-sm font-medium px-4 py-2.5 rounded-full glass hover:border-brand-purple/50 transition-colors text-ink-100"
            >
              <FiGithub size={15} /> Code
            </a>
          ) : (
            <span className="flex-1 inline-flex items-center justify-center gap-2 text-sm font-medium px-4 py-2.5 rounded-full bg-base-700 text-ink-600">
              <FiGithub size={15} /> Coming soon
            </span>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2 text-sm font-semibold px-4 py-2.5 rounded-full btn-gradient text-white"
            >
              <FiExternalLink size={15} /> Live Demo
            </a>
          )}
        </div>
      </div>
    </GlassCard>
  </motion.div>
);

export default ProjectCard;
