import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FiExternalLink, FiGithub } from 'react-icons/fi';
import GitHubCalendar from 'react-github-calendar';
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
            

          </div>
        )}
      </Container>
    </section>
  );
};

export default GithubStats;
