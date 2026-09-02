import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { FiDownload, FiMail, FiArrowDown } from 'react-icons/fi';
import Container from '../ui/Container';
import { usePortfolio } from '../../context/PortfolioContext';

const Hero = () => {
  const { profile } = usePortfolio();
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-32 pb-20">
      <Container className="grid lg:grid-cols-[1.1fr_0.9fr] gap-14 items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <span className="inline-flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-brand-cyan mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            Open to internships
          </span>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-ink-100 leading-tight mb-5">
            Hi, I&apos;m <span className="text-gradient">{profile.name}</span>
          </h1>

          <div className="text-xl sm:text-2xl font-display text-brand-purple mb-6 h-9">
            <TypeAnimation
              sequence={profile.typedStrings}
              wrapper="span"
              speed={50}
              repeat={Infinity}
              className="text-brand-purple"
            />
          </div>

          <p className="text-ink-400 text-base sm:text-lg leading-relaxed max-w-xl mb-9">
            {profile.summary}
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <a
              href={profile.resumeUrl}
              download
              className="btn-gradient text-white font-semibold px-7 py-3.5 rounded-full inline-flex items-center gap-2"
            >
              <FiDownload /> Download Resume
            </a>

            <button
              onClick={scrollToContact}
              className="glass text-ink-100 font-semibold px-7 py-3.5 rounded-full inline-flex items-center gap-2 hover:border-brand-purple/50 transition-colors"
            >
              <FiMail /> Contact Me
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
          className="relative flex justify-center"
        >
          <div className="relative w-72 h-72 sm:w-96 sm:h-96">
            <div className="absolute inset-0 rounded-2xl glass-strong overflow-hidden">
              <img
                src={profile.profile_image_url || '/images/hero.jpg'}
                alt={profile.name}
                className="w-full h-full object-cover rounded-2xl"
              />
            </div>
          </div>
        </motion.div>
      </Container>

      <motion.button
        onClick={() =>
          document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
        }
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-ink-400 hover:text-ink-100 transition-colors"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.8 }}
        aria-label="Scroll to about section"
      >
        <FiArrowDown size={22} />
      </motion.button>
    </section>
  );
};

export default Hero;