import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiHome } from 'react-icons/fi';

const NotFound = () => (
  <section className="min-h-screen flex items-center justify-center px-6 text-center">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <p className="font-mono text-8xl font-bold text-gradient mb-4">404</p>
      <h1 className="text-2xl font-semibold text-ink-100 mb-3">Page not found</h1>
      <p className="text-ink-400 mb-8 max-w-md mx-auto">
        The page you&apos;re looking for doesn&apos;t exist or may have moved.
      </p>
      <Link
        to="/"
        className="btn-gradient text-white font-semibold px-7 py-3.5 rounded-full inline-flex items-center gap-2"
      >
        <FiHome /> Back to Home
      </Link>
    </motion.div>
  </section>
);

export default NotFound;
