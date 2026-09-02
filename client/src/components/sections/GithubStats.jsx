import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FiExternalLink, FiGithub } from 'react-icons/fi';
import Container from '../ui/Container';
import SectionHeading from '../ui/SectionHeading';
import GlassCard from '../ui/GlassCard';
import { fetchGithubData } from '../../services/api';
import { usePortfolio } from '../../context/PortfolioContext';

const statLabels = [
  ['repositoryCount', 'Public repositories'],
  ['followers', 'Followers'],
  ['stars', 'Total stars'],
  ['following', 'Following'],
];

const GithubStats = () => {
  const { profile } = usePortfolio();
  const [data, setData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;

    fetchGithubData(profile.githubUsername)
      .then((result) => {
        if (active) setData(result);
      })
      .catch(() => {
        if (active) setError('GitHub data is temporarily unavailable.');
      });

    return () => {
      active = false;
    };
  }, [profile.githubUsername]);

  return (
    <section id="github" className="py-24 relative">
      <Container>
        <SectionHeading
          eyebrow="GitHub"
          title="Open source & contribution activity"
          subtitle="Live profile information fetched directly from GitHub."
        />

        <div className="flex justify-center mb-8">
          <a
            href={profile.socials.github}
            target="_blank"
            rel="noreferrer"
            className="btn-gradient text-white font-semibold px-6 py-3 rounded-full inline-flex items-center gap-2"
          >
            <FiGithub /> View GitHub Profile <FiExternalLink size={15} />
          </a>
        </div>

        {error ? (
          <GlassCard className="p-6 text-center" hover={false}>
            <p className="text-ink-400">{error}</p>
            <p className="text-sm text-ink-600 mt-2">
              Visit the profile above for the latest contribution information.
            </p>
          </GlassCard>
        ) : (
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-6">
            <GlassCard className="p-6" hover={false}>
              {!data ? (
                <p className="text-ink-400 animate-pulse">Loading GitHub statistics...</p>
              ) : (
                <>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {statLabels.map(([key, label]) => (
                      <div key={key}>
                        <p className="text-2xl font-bold text-ink-100">{data[key].toLocaleString()}</p>
                        <p className="text-xs text-ink-400 mt-1">{label}</p>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-ink-600 mt-6">
                    Statistics are loaded directly from the public GitHub API.
                  </p>
                </>
              )}
            </GlassCard>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5 }}
            >
              <GlassCard className="p-6 h-full" hover={false}>
                <h3 className="text-lg font-semibold text-ink-100 mb-4">Top languages</h3>
                {!data ? (
                  <p className="text-ink-400 animate-pulse">Loading language data...</p>
                ) : data.topLanguages.length ? (
                  <div className="flex flex-wrap gap-2">
                    {data.topLanguages.map(({ name, count }) => (
                      <span
                        key={name}
                        className="px-3 py-1.5 rounded-full bg-base-700 border border-base-600 text-sm text-brand-cyan"
                      >
                        {name} <span className="text-ink-600">({count})</span>
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-ink-400">No public language data available yet.</p>
                )}
              </GlassCard>
            </motion.div>
          </div>
        )}

      </Container>
    </section>
  );
};

export default GithubStats;
