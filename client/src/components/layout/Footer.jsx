import { FiGithub, FiLinkedin, FiMail, FiPhone } from 'react-icons/fi';
import { usePortfolio } from '../../context/PortfolioContext';

const Footer = () => {
  const { profile } = usePortfolio();
  const socialLinks = [
    { icon: FiGithub, href: profile.socials.github, label: 'GitHub' },
    { icon: FiLinkedin, href: profile.socials.linkedin, label: 'LinkedIn' },
    { icon: FiMail, href: `mailto:${profile.email}`, label: 'Email' },
    { icon: FiPhone, href: `tel:${profile.phone.replace(/[^\d+]/g, '')}`, label: 'Phone' },
  ];
  return (
  <footer className="relative border-t border-base-700 mt-10">
    <div className="w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
      <p className="text-ink-400 text-sm text-center sm:text-left">
        © {new Date().getFullYear()} {profile.name}. Built with the MERN stack.
      </p>
      <div className="flex items-center gap-3">
        {socialLinks.map(({ icon: Icon, href, label }) => (
          <a
            key={label}
            href={href}
            target={href.startsWith('http') ? '_blank' : undefined}
            rel="noreferrer"
            aria-label={label}
            className="w-10 h-10 rounded-full glass flex items-center justify-center text-ink-200 hover:text-ink-100 hover:border-brand-purple/50 transition-colors"
          >
            <Icon size={16} />
          </a>
        ))}
      </div>
    </div>
  </footer>
  );
};

export default Footer;
