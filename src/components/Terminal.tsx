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

const WELCOME = `KonradOS v1.0.0 — Interactive Developer Portfolio
Type "help" to see available commands. Press Tab to autocomplete.`;

const COMPLETABLE = ['help', 'whoami', 'skills', 'projects', 'experience', 'education', 'awards', 'contact', 'clear', 'get'];

const GET_PREFIX = 'get /projects/';

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

  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const nextId = useRef(1);

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

    if (cmd === 'projects') {
      addLine('info', 'Fetching repositories from GitHub...');
      try {
        const repos = await getRepos();
        const formatted = repos.map((r) => ({
          name: r.name,
          description: r.description ?? '',
          language: r.language ?? 'unknown',
          stars: r.stargazers_count,
          url: r.html_url,
        }));
        addLine('output', JSON.stringify(formatted, null, 2));
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'Failed to fetch repositories';
        addLine('error', JSON.stringify({ error: msg, status: 503 }, null, 2));
      }
      return;
    }

    if (cmd.startsWith('get /projects/')) {
      const name = cmd.slice('get /projects/'.length).trim();
      if (!name) {
        addLine('error', JSON.stringify({ error: 'Bad Request', message: 'Project name is required', usage: 'get /projects/{name}' }, null, 2));
        return;
      }
      addLine('info', `Fetching project "${name}"...`);
      try {
        const repos = await getRepos();
        const repo = repos.find((r) => r.name.toLowerCase() === name.toLowerCase());
        if (!repo) {
          addLine('error', JSON.stringify({ error: 'Not Found', message: `Project "${name}" does not exist`, status: 404 }, null, 2));
          return;
        }
        addLine('output', JSON.stringify({
          name: repo.name,
          description: repo.description ?? '',
          language: repo.language ?? 'unknown',
          stars: repo.stargazers_count,
          topics: repo.topics,
          url: repo.html_url,
        }, null, 2));
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'Failed to fetch repositories';
        addLine('error', JSON.stringify({ error: msg, status: 503 }, null, 2));
      }
      return;
    }

    addLine('error', JSON.stringify({
      error: 'Command not found',
      command: cmd,
      hint: 'Type "help" to see available commands',
      status: 404,
    }, null, 2));
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
