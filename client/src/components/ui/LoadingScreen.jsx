import { motion } from 'framer-motion';

const LoadingScreen = () => (
  <motion.div
    className="fixed inset-0 z-[100] bg-base-900 flex items-center justify-center"
    exit={{ opacity: 0 }}
    transition={{ duration: 0.6, ease: 'easeInOut' }}
  >
    <div className="flex flex-col items-center gap-6">
      <div className="relative w-16 h-16">
        <span className="absolute inset-0 rounded-full border-2 border-base-700" />
        <motion.span
          className="absolute inset-0 rounded-full border-t-2 border-brand-purple"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
        />
        <span className="absolute inset-0 flex items-center justify-center font-mono text-brand-cyan text-sm">
          {'</>'}
        </span>
      </div>
      <p className="font-mono text-ink-400 text-sm tracking-widest">LOADING PORTFOLIO</p>
    </div>
  </motion.div>
);

export default LoadingScreen;
