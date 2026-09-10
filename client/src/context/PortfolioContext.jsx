import { createContext, useContext, useMemo } from 'react';
import {
  achievements,
  certifications,
  education,
  experience,
  profile,
  projects,
  skills,
} from '../utils/data';

const PortfolioContext = createContext({
  profile,
  projects,
  skills,
  education,
  experience,
  certifications,
  achievements,
  loading: false,
  error: '',
});

export function PortfolioProvider({ children }) {
  const value = useMemo(
    () => ({
      profile,
      projects,
      skills,
      education,
      experience,
      certifications,
      achievements,
      loading: false,
      error: '',
    }),
    []
  );

  return <PortfolioContext.Provider value={value}>{children}</PortfolioContext.Provider>;
}

export const usePortfolio = () => useContext(PortfolioContext);
