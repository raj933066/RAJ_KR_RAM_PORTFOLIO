import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { supabase, supabaseConfigured } from '../lib/supabase';

const emptyProfile = { name: '', headline: '', tagline: '', summary: '', objective: '', email: '', phone: '', location: '', resumeUrl: '', githubUsername: '', profile_image_url: '', socials: { github: '', linkedin: '', leetcode: '', twitter: '', email: '', phone: '' }, typedStrings: [] };
const empty = { profile: emptyProfile, projects: [], skills: [], education: [], experience: [], courses: [], certifications: [], achievements: [] };
const PortfolioContext = createContext({ ...empty, loading: true, error: '' });

const read = (table) => supabase.from(table).select('*').order('display_order', { ascending: true });

export function PortfolioProvider({ children }) {
  const [content, setContent] = useState(empty);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = async () => {
    if (!supabaseConfigured) {
      setError('Portfolio content is not configured. Add the Supabase environment variables.');
      setLoading(false);
      return;
    }
    const results = await Promise.all([
      supabase.from('profiles').select('*').limit(1).maybeSingle(),
      read('projects'), read('skills'), read('education'), read('experience'),
      read('courses'), read('certifications'), read('achievements'),
    ]);
    const failed = results.find((result) => result.error);
    if (failed) {
      console.error('Failed to load portfolio content:', failed.error);
      setError('Portfolio content is temporarily unavailable.');
    } else {
      const [profile, projects, skills, education, experience, courses, certifications, achievements] = results;
      setContent({
        profile: profile.data ? { ...profile.data, tagline: profile.data.headline, summary: profile.data.bio, objective: profile.data.about, resumeUrl: profile.data.resume_url, githubUsername: profile.data.github_username, socials: { github: profile.data.github_url, linkedin: profile.data.linkedin_url, leetcode: profile.data.leetcode_url, twitter: profile.data.twitter_url, email: profile.data.email, phone: profile.data.phone }, typedStrings: profile.data.typed_strings || [profile.data.headline, 2000] } : null,
        projects: (projects.data || []).map((item) => ({ ...item, name: item.title, image: item.image_url, github: item.github_url, demo: item.live_url, tech: item.technologies || [], features: item.features || [] })),
        skills: skills.data || [], education: (education.data || []).map((item) => ({ ...item, school: item.institution, period: item.period || [item.start_date, item.end_date].filter(Boolean).join(' - '), detail: item.description })),
        experience: (experience.data || []).map((item) => ({ ...item, period: item.period || [item.start_date, item.end_date].filter(Boolean).join(' - '), points: item.points || (item.description ? [item.description] : []) })),
        courses: courses.data || [], certifications: (certifications.data || []).map((item) => ({ ...item, org: item.issuer, image: item.certificate_url, verifyUrl: item.certificate_url, date: item.issue_date })), achievements: (achievements.data || []).map((item) => ({ ...item, detail: item.description })),
      });
    }
    setLoading(false);
  };

  useEffect(() => { load(); }, []);
  const value = useMemo(() => ({ ...content, loading, error, reload: load }), [content, loading, error]);
  return <PortfolioContext.Provider value={value}>{children}</PortfolioContext.Provider>;
}

export const usePortfolio = () => useContext(PortfolioContext);
