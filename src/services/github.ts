export interface GitHubRepo {
  name: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  html_url: string;
  topics: string[];
  fork: boolean;
}

let cache: GitHubRepo[] | null = null;

export const getRepos = async (): Promise<GitHubRepo[]> => {
  if (cache) return cache;
  const res = await fetch(
    'https://api.github.com/users/konradxmalinowski/repos?per_page=100&sort=updated'
  );
  if (!res.ok) throw new Error(`GitHub API error: ${res.status} ${res.statusText}`);
  const all: GitHubRepo[] = await res.json();
  cache = all.filter((r) => !r.fork);
  return cache;
};
