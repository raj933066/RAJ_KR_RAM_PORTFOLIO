import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor = () => {
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [enabled, setEnabled] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const springConfig = { damping: 28, stiffness: 400, mass: 0.4 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  useEffect(() => {
    const isDesktop = window.matchMedia('(min-width: 1024px) and (hover: hover)').matches;
    setEnabled(isDesktop);
    if (!isDesktop) return undefined;

    const move = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setIsVisible(true);
      const target = e.target;
      setIsPointer(!!target.closest('a, button, input, textarea, [role="button"]'));
    };
    const hide = () => setIsVisible(false);

    window.addEventListener('mousemove', move);
    document.addEventListener('mouseleave', hide);
    return () => {
      window.removeEventListener('mousemove', move);
      document.removeEventListener('mouseleave', hide);
    };
  }, [mouseX, mouseY]);

  if (!enabled) return null;

  return (
    <motion.div
      className="cursor-dot bg-white"
      style={{
        x,
        y,
        width: isPointer ? 44 : 18,
        height: isPointer ? 44 : 18,
        marginLeft: isPointer ? -22 : -9,
        marginTop: isPointer ? -22 : -9,
        opacity: isVisible ? 1 : 0,
      }}
      transition={{ width: 0.2, height: 0.2 }}
    />
  );
};

export default CustomCursor;
