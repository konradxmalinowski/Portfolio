# Architecture

KonradOS is a single-page React application with no routing and no global state library.  
Everything lives in one Terminal component; data is either static (imported at build time) or fetched from the GitHub REST API at runtime.

---

## File structure

```
portfolio/
├── index.html               # Vite entry point
├── vite.config.ts           # Vite + React Compiler config
├── tsconfig.app.json        # TypeScript config for src/
├── package.json
│
├── src/
│   ├── main.tsx             # React DOM root mount
│   ├── App.tsx              # Thin wrapper — renders <Terminal />
│   ├── index.css            # All styles + CSS theme variables
│   ├── App.css              # (unused placeholder)
│   │
│   ├── components/
│   │   ├── Terminal.tsx     # Core component — state, command parser, input
│   │   └── Line.tsx         # Renders one output line (input/output/error/info)
│   │
│   ├── data/
│   │   ├── commands.ts      # Command name + description registry
│   │   └── staticData.ts    # whoami, skills, experience, education, contact, awards
│   │
│   └── services/
│       └── github.ts        # GitHub API fetch + in-memory cache
│
└── docs/
    ├── COMMANDS.md
    ├── THEMES.md
    ├── ARCHITECTURE.md      # this file
    └── CONTRIBUTING.md
```

---

## Component tree

```
App
└── Terminal
    ├── terminal-header      (title bar with traffic-light dots)
    └── terminal-body
        ├── Line[]           (previous output — read-only)
        └── input-row        (live input with autocomplete overlay)
```

There is intentionally only one component that holds state. `Line` is a pure presentational component.

---

## State (inside Terminal)

| State | Type | Purpose |
|---|---|---|
| `lines` | `TerminalLine[]` | All displayed output rows |
| `input` | `string` | Current text in the input field |
| `cmdHistory` | `string[]` | Past commands, newest first |
| `historyIdx` | `number` | Pointer for ↑/↓ navigation (-1 = live input) |
| `theme` | `Theme` | Active theme name, synced to `localStorage` |

---

## Command execution flow

```
User presses Enter
  └─► handleCommand(raw)
        ├─ trim & guard empty input
        ├─ push to cmdHistory
        ├─ match against hardcoded branches (clear / help / whoami / ...)
        │     └─ each branch calls addLine(type, JSON.stringify(data, null, 2))
        ├─ `projects` / `get /projects/{name}` → async GitHub API call
        ├─ `theme` / `theme <name>` → setTheme() + addLine()
        └─ fallback → addLine('error', 404 JSON)
```

There is no command registry with callbacks — command handling is explicit `if` branches in `handleCommand`. This is intentional (KISS): adding a command means adding one `if` block.

---

## Autocomplete

`computeSuggestion(val: string): string` returns the ghost-text suffix to display.

Priority order:
1. `get /projects/<prefix>` — matches repo names from `getCachedRepos()`
2. `theme <prefix>` — matches theme names from the `THEMES` constant
3. `get /projects/` prefix expansion (typing `get` → `get /projects/`)
4. Top-level command name from `COMPLETABLE[]`

The suggestion is rendered as a non-interactive overlay (CSS grid stacking) so the real `<input>` keeps focus and caret behaviour.

---

## Theming

Themes are CSS custom properties defined on `body[data-theme="..."]` in `src/index.css`.  
`Terminal` reads the initial theme from `localStorage`, writes `document.body.dataset.theme` via `useEffect`, and saves back to `localStorage` on every change.  
No JavaScript style injection — the browser resolves variables natively.

See [THEMES.md](THEMES.md) for the full colour palette of each theme.

---

## GitHub API

`src/services/github.ts` exports two functions:

- `getRepos()` — fetches `https://api.github.com/users/konradxmalinowski/repos?per_page=100&sort=updated`, filters out forks, populates a module-level cache, and returns the array. Subsequent calls return the cache synchronously.
- `getCachedRepos()` — returns the cache or `null` if `getRepos()` has not been called yet. Used by autocomplete to avoid triggering a network request on Tab press.

The API has a 60 req/hour unauthenticated rate limit. The in-memory cache means only one request is made per page load regardless of how many `projects` or `get` commands are run.

---

## Build

```bash
npm run build   # tsc -b && vite build → dist/
```

Vite uses **Rolldown** internally (Vite 6+). The React Compiler Babel preset (`babel-plugin-react-compiler`) is applied via `@rolldown/plugin-babel` — it automatically memoises components and hooks at compile time without `useMemo`/`useCallback` calls in source.

Output is a single HTML file + hashed JS/CSS chunks, ready to deploy to any static host (GitHub Pages, Vercel, Netlify, Cloudflare Pages).
