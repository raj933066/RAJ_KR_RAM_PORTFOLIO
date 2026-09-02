import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 15000,
});

export const sendContactMessage = (payload) => api.post('/contact', payload);

export const fetchGithubData = async (username) => {
  const headers = { Accept: 'application/vnd.github+json' };
  const [profileResponse, repositoriesResponse] = await Promise.all([
    axios.get(`https://api.github.com/users/${encodeURIComponent(username)}`, { headers, timeout: 10000 }),
    axios.get(
      `https://api.github.com/users/${encodeURIComponent(username)}/repos?per_page=100&sort=updated`,
      { headers, timeout: 10000 }
    ),
  ]);

  const repositories = repositoriesResponse.data;
  const languages = repositories.reduce((counts, repository) => {
    if (repository.language) counts[repository.language] = (counts[repository.language] || 0) + 1;
    return counts;
  }, {});

  const topLanguages = Object.entries(languages)
    .sort(([, countA], [, countB]) => countB - countA)
    .slice(0, 5)
    .map(([name, count]) => ({ name, count }));

  return {
    profile: profileResponse.data,
    repositoryCount: profileResponse.data.public_repos,
    followers: profileResponse.data.followers,
    following: profileResponse.data.following,
    publicGists: profileResponse.data.public_gists,
    stars: repositories.reduce((total, repository) => total + repository.stargazers_count, 0),
    topLanguages,
  };
};

export default api;
