import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FiMenu, FiX, FiMoon, FiSun } from 'react-icons/fi';
import { navLinks } from '../../utils/data';
import { usePortfolio } from '../../context/PortfolioContext';
import { useTheme } from '../../context/ThemeContext';

const Navbar = () => {
  const { profile } = usePortfolio();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isDark, toggleTheme } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLinkClick = (to) => {
    setOpen(false);
    const id = to.split('#')[1];
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'py-3 glass-strong' : 'py-5 bg-transparent'
      }`}
    >
      <nav className="w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 flex items-center justify-between">
        <a
          href="/#home"
          onClick={(e) => {
            e.preventDefault();
            handleLinkClick('/#home');
          }}
          className="font-display font-bold text-xl text-ink-100 whitespace-nowrap shrink-0"
        >
          <span className="text-brand-purple">{'<RAJ />'}</span>
        </a>

        <ul className="hidden lg:flex items-center gap-4 xl:gap-7 whitespace-nowrap">
          {navLinks.map((link) => (
            <li key={link.label}>
              <button
                onClick={() => handleLinkClick(link.to)}
                className="text-sm font-medium text-ink-400 hover:text-ink-100 transition-colors"
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        <div className="hidden lg:flex items-center gap-3 xl:gap-4 shrink-0">
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            aria-pressed={isDark}
            className="w-9 h-9 rounded-full glass flex items-center justify-center text-ink-200 hover:text-brand-cyan transition-colors"
          >
            {isDark ? <FiSun size={16} /> : <FiMoon size={16} />}
          </button>
          <a
            href={profile.resumeUrl}
            download
            className="btn-gradient text-white text-sm font-semibold px-5 py-2.5 rounded-full"
          >
            Resume
          </a>
        </div>

        <button
          className="lg:hidden text-ink-100 w-10 h-10 flex items-center justify-center"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden glass-strong mx-5 mt-3 rounded-2xl overflow-hidden"
          >
            <ul className="flex flex-col p-4 gap-1">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => handleLinkClick(link.to)}
                    className="w-full text-left px-3 py-2.5 rounded-lg text-ink-200 hover:bg-base-700 transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
              <li className="flex items-center gap-3 px-3 pt-2">
                <button
                  onClick={toggleTheme}
                  className="w-9 h-9 rounded-full glass flex items-center justify-center text-ink-200"
                  aria-label="Toggle theme"
                  aria-pressed={isDark}
                >
                  {isDark ? <FiSun size={16} /> : <FiMoon size={16} />}
                </button>
                <a
                  href={profile.resumeUrl}
                  download
                  className="flex-1 text-center btn-gradient text-white text-sm font-semibold px-5 py-2.5 rounded-full"
                >
                  Resume
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
