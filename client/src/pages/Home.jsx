import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import Skills from '../components/sections/Skills';
import Experience from '../components/sections/Experience';
import Projects from '../components/sections/Projects';
import Certifications from '../components/sections/Certifications';
import Education from '../components/sections/Education';
import Achievements from '../components/sections/Achievements';
import GithubStats from '../components/sections/GithubStats';
import Contact from '../components/sections/Contact';
import { usePortfolio } from '../context/PortfolioContext';

const Home = () => {
  const { loading, error } = usePortfolio();
  if (loading) return <div className="min-h-screen flex items-center justify-center text-ink-400">Loading portfolio...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center text-ink-400 px-6 text-center">{error}</div>;
  return (
  <>
    <Hero />
    <About />
    <Skills />
    <Experience />
    <Projects />
    <Certifications />
    <Education />
    <Achievements />
    <GithubStats />
    <Contact />
  </>
  );
};

export default Home;
