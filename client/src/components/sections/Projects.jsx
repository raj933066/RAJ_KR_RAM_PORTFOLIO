import Container from '../ui/Container';
import SectionHeading from '../ui/SectionHeading';
import ProjectCard from '../ui/ProjectCard';
import { usePortfolio } from '../../context/PortfolioContext';

const Projects = () => {
  const { projects } = usePortfolio();
  return (
  <section id="projects" className="py-24 relative">
    <Container>
      <SectionHeading
        eyebrow="Projects"
        title="Things I've built"
        subtitle="A selection of applications built while learning and applying full-stack development concepts."
      />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
        {projects.map((project, idx) => (
          <ProjectCard key={project.id} project={project} index={idx} />
        ))}
      </div>
    </Container>
  </section>
  );
};

export default Projects;
