import { useState, useEffect, useRef, type KeyboardEvent } from 'react';
import { Line, type LineType } from './Line';
import { COMMANDS } from '../data/commands';
import { whoami, skills, experience, education, contact, awards } from '../data/staticData';
import { getRepos, getCachedRepos } from '../services/github';

interface TerminalLine {
  id: number;
  type: LineType;
  content: string;
}

const THEMES = ['dark', 'light', 'matrix', 'dracula', 'nord'] as const;
type Theme = typeof THEMES[number];

const STORAGE_KEY = 'konrados-theme';

function loadTheme(): Theme {
  const saved = localStorage.getItem(STORAGE_KEY);
  return (THEMES as readonly string[]).includes(saved ?? '') ? (saved as Theme) : 'dark';
}

function levenshtein(a: string, b: string): number {
  const m = a.length, n = b.length;
  const dp = Array.from({ length: m + 1 }, (_, i) =>
    Array.from({ length: n + 1 }, (_, j) => (i === 0 ? j : j === 0 ? i : 0))
  );
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] = a[i - 1] === b[j - 1]
        ? dp[i - 1][j - 1]
        : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
    }
  }
  return dp[m][n];
}

const WELCOME = `KonradOS v1.0.0 — Interactive Developer Portfolio
Type "help" to see available commands. Press Tab to autocomplete.
Tip: type "theme <name>" to change appearance (dark, light, matrix, dracula, nord).`;

const COMPLETABLE = ['help', 'whoami', 'skills', 'projects', 'experience', 'education', 'awards', 'contact', 'clear', 'get', 'theme', 'stats', 'health'];

const GET_PREFIX = 'get /projects/';
const THEME_PREFIX = 'theme ';

function computeSuggestion(val: string): string {
  if (!val) return '';

  if (val.startsWith(GET_PREFIX)) {
    const prefix = val.slice(GET_PREFIX.length);
    const repos = getCachedRepos();
    if (!repos) return '';
    if (!prefix) return repos.length > 0 ? repos[0].name : '';
    const match = repos.find((r) => r.name.toLowerCase().startsWith(prefix.toLowerCase()));
    return match ? match.name.slice(prefix.length) : '';
  }

  if (val.startsWith(THEME_PREFIX)) {
    const prefix = val.slice(THEME_PREFIX.length);
    if (!prefix) return THEMES[0];
    const match = THEMES.find((t) => t !== prefix && t.startsWith(prefix.toLowerCase()));
    return match ? match.slice(prefix.length) : '';
  }

  if (GET_PREFIX.startsWith(val)) {
    return GET_PREFIX.slice(val.length);
  }

  const match = COMPLETABLE.find((c) => c !== val && c.startsWith(val.toLowerCase()));
  if (!match) return '';
  return (match === 'get' ? GET_PREFIX : match).slice(val.length);
}

export function Terminal() {
  const [lines, setLines] = useState<TerminalLine[]>([
    { id: 0, type: 'info', content: WELCOME },
  ]);
  const [input, setInput] = useState('');
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const [theme, setTheme] = useState<Theme>(loadTheme);

  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const nextId = useRef(1);

  useEffect(() => {
    document.body.dataset.theme = theme;
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [lines]);

  function addLine(type: LineType, content: string) {
    const id = nextId.current++;
    setLines((prev) => [...prev, { id, type, content }]);
  }

  async function handleCommand(raw: string) {
    const cmd = raw.trim();
    if (!cmd) return;

    setCmdHistory((prev) => [cmd, ...prev]);
    setHistoryIdx(-1);

    if (cmd === 'clear') {
      setLines([{ id: nextId.current++, type: 'info', content: WELCOME }]);
      return;
    }

    addLine('input', cmd);

    if (cmd === 'help') {
      const table = Object.fromEntries(COMMANDS.map((c) => [c.name, c.description]));
      addLine('output', JSON.stringify(table, null, 2));
      return;
    }

    if (cmd === 'whoami') {
      addLine('output', JSON.stringify(whoami, null, 2));
      return;
    }

    if (cmd === 'skills') {
      addLine('output', JSON.stringify(skills, null, 2));
      return;
    }

    if (cmd === 'experience') {
      addLine('output', JSON.stringify(experience, null, 2));
      return;
    }

    if (cmd === 'education') {
      addLine('output', JSON.stringify(education, null, 2));
      return;
    }

    if (cmd === 'contact') {
      addLine('output', JSON.stringify(contact, null, 2));
      return;
    }

    if (cmd === 'awards') {
      addLine('output', JSON.stringify(awards, null, 2));
      return;
    }

    if (cmd === 'theme' || cmd.startsWith('theme ')) {
      const arg = cmd.slice('theme'.length).trim();
      if (!arg) {
        addLine('output', JSON.stringify({ available: [...THEMES], current: theme }, null, 2));
        return;
      }
      if ((THEMES as readonly string[]).includes(arg)) {
        setTheme(arg as Theme);
        addLine('output', JSON.stringify({ message: `Theme set to "${arg}"`, theme: arg }, null, 2));
      } else {
        addLine('error', JSON.stringify({ error: 'Unknown theme', available: [...THEMES] }, null, 2));
      }
      return;
    }

    if (cmd === 'stats') {
      addLine('info', 'Computing stats from GitHub...');
      try {
        const fromCache = getCachedRepos() !== null;
        const t0 = Date.now();
        const repos = await getRepos();
        const ms = Date.now() - t0;
        const langCount: Record<string, number> = {};
        let totalStars = 0;
        for (const r of repos) {
          totalStars += r.stargazers_count;
          if (r.language) langCount[r.language] = (langCount[r.language] ?? 0) + 1;
        }
        const sorted = Object.entries(langCount).sort((a, b) => b[1] - a[1]);
        const mostUsed = sorted[0]?.[0] ?? 'N/A';
        addLine('output', JSON.stringify({
          total_repos: repos.length,
          most_used_language: mostUsed,
          total_stars: totalStars,
          languages: Object.fromEntries(sorted),
        }, null, 2));
        addLine('info', `[200 OK] ${ms}ms · source: ${fromCache ? 'cache' : 'github'}`);
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'Failed to fetch repositories';
        addLine('error', JSON.stringify({ error: msg, status: 503 }, null, 2));
      }
      return;
    }

    if (cmd === 'health') {
      addLine('info', 'Checking system status...');
      const t0 = Date.now();
      let githubStatus = 'unreachable';
      try {
        const res = await fetch('https://api.github.com');
        githubStatus = res.ok ? 'reachable' : `error ${res.status}`;
      } catch {
        githubStatus = 'unreachable';
      }
      const ms = Date.now() - t0;
      addLine('output', JSON.stringify({
        status: 'ok',
        github_api: githubStatus,
        latency_ms: ms,
        app_version: '1.0.0',
      }, null, 2));
      return;
    }

    if (cmd === 'projects') {
      addLine('info', 'Fetching repositories from GitHub...');
      try {
        const fromCache = getCachedRepos() !== null;
        const t0 = Date.now();
        const repos = await getRepos();
        const ms = Date.now() - t0;
        const formatted = repos.map((r) => ({
          name: r.name,
          description: r.description ?? '',
          language: r.language ?? 'unknown',
          stars: r.stargazers_count,
          url: r.html_url,
        }));
        addLine('output', JSON.stringify(formatted, null, 2));
        addLine('info', `[200 OK] ${repos.length} repositories · ${ms}ms · source: ${fromCache ? 'cache' : 'github'}`);
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'Failed to fetch repositories';
        addLine('error', JSON.stringify({ error: msg, status: 503 }, null, 2));
      }
      return;
    }

    if (cmd.startsWith('get /projects/')) {
      const rest = cmd.slice('get /projects/'.length);
      const openFlag = rest.includes('--open');
      const name = rest.replace(/\s*--open\s*/g, '').trim();
      if (!name) {
        addLine('error', JSON.stringify({ error: 'Bad Request', message: 'Project name is required', usage: 'get /projects/{name} [--open]' }, null, 2));
        return;
      }
      addLine('info', `Fetching project "${name}"...`);
      try {
        const fromCache = getCachedRepos() !== null;
        const t0 = Date.now();
        const repos = await getRepos();
        const ms = Date.now() - t0;
        const repo = repos.find((r) => r.name.toLowerCase() === name.toLowerCase());
        if (!repo) {
          addLine('error', JSON.stringify({ error: 'Not Found', message: `Project "${name}" does not exist`, status: 404 }, null, 2));
          return;
        }
        if (openFlag) window.open(repo.html_url, '_blank');
        addLine('output', JSON.stringify({
          name: repo.name,
          description: repo.description ?? '',
          language: repo.language ?? 'unknown',
          stars: repo.stargazers_count,
          topics: repo.topics,
          url: repo.html_url,
        }, null, 2));
        addLine('info', `[200 OK] ${ms}ms · source: ${fromCache ? 'cache' : 'github'}${openFlag ? ' · opened in browser' : ''}`);
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'Failed to fetch repositories';
        addLine('error', JSON.stringify({ error: msg, status: 503 }, null, 2));
      }
      return;
    }

    {
      const firstWord = cmd.split(' ')[0].toLowerCase();
      const commandNames = COMMANDS.map((c) => c.name.split(' ')[0]);
      const closest = commandNames.reduce<{ name: string; dist: number }>(
        (best, name) => {
          const d = levenshtein(firstWord, name);
          return d < best.dist ? { name, dist: d } : best;
        },
        { name: '', dist: Infinity }
      );
      const suggestion = closest.dist <= 2 ? closest.name : null;
      addLine('error', JSON.stringify({
        error: 'Command not found',
        command: cmd,
        hint: suggestion ? `did you mean: "${suggestion}"?` : 'Type "help" to see available commands',
        status: 404,
      }, null, 2));
    }
  }

  function handleTab() {
    const suggestion = computeSuggestion(input);
    if (suggestion) {
      setInput(input + suggestion);
      return;
    }
    if (!input) {
      addLine('info', COMPLETABLE.join('  '));
    }
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Tab') {
      e.preventDefault();
      handleTab();
    } else if (e.key === 'Enter') {
      const cmd = input;
      setInput('');
      handleCommand(cmd);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const newIdx = Math.min(historyIdx + 1, cmdHistory.length - 1);
      if (newIdx >= 0) {
        setHistoryIdx(newIdx);
        setInput(cmdHistory[newIdx]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const newIdx = historyIdx - 1;
      setHistoryIdx(newIdx);
      setInput(newIdx < 0 ? '' : cmdHistory[newIdx]);
    }
  }

  const suggestion = computeSuggestion(input);

  return (
    <div className="terminal" onClick={() => inputRef.current?.focus()}>
      <div className="terminal-header">
        <span className="dot dot-red" />
        <span className="dot dot-yellow" />
        <span className="dot dot-green" />
        <span className="terminal-title">konrad@portfolio ~ </span>
      </div>
      <div className="terminal-body">
        {lines.map((line) => (
          <Line key={line.id} type={line.type} content={line.content} />
        ))}
        <div className="input-row">
          <span className="prompt">$</span>
          <div className="input-wrapper">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              autoFocus
              spellCheck={false}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              aria-label="Terminal input"
            />
            <div className="input-overlay" aria-hidden="true">
              <span className="input-typed">{input}</span>
              {suggestion && <span className="input-suggestion">{suggestion}</span>}
            </div>
          </div>
        </div>
        <div ref={bottomRef} />
      </div>
    </div>
  );
}
