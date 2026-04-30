# Architecture

KonradOS is a single-page React application with no routing and no global state library.  
Everything lives in one Terminal component; data is either static (imported at build time) or fetched from the GitHub REST API at runtime.

---

## File structure

```
portfolio/
├── index.html               # Vite entry point — SEO meta, OG tags, JSON-LD
├── vite.config.ts           # Vite + React Compiler config, base: '/Portfolio/'
├── tsconfig.app.json        # TypeScript config for src/
├── package.json
│
├── public/                  # Static assets copied to dist/ as-is
│   ├── favicon.svg
│   ├── icons.svg
│   ├── robots.txt
│   ├── sitemap.xml
│   └── site.webmanifest
│
├── src/
│   ├── main.tsx             # React DOM root mount
│   ├── App.tsx              # Thin wrapper — renders <Terminal />
│   ├── index.css            # All styles + CSS theme variables + syntax highlight vars
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
│       └── github.ts        # GitHub API fetch + TTL cache (60s)
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
        ├─ `stats` / `health` → async GitHub API call
        ├─ `projects` / `get /projects/{name} [--open]` → async GitHub API call
        │     └─ addLine('info', '[200 OK] Xms · source: cache|github')
        ├─ `theme` / `theme <name>` → setTheme() + addLine()
        └─ fallback → levenshtein() suggestion + addLine('error', 404 JSON)
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

## "Did you mean?" errors

When a command is not recognised, `levenshtein(a, b)` is called against every command name. If the closest match has an edit distance ≤ 2, the hint field shows `did you mean: "<name>"?` instead of the generic fallback message.

---

## Theming

Themes are CSS custom properties defined on `body[data-theme="..."]` in `src/index.css`.  
`Terminal` reads the initial theme from `localStorage`, writes `document.body.dataset.theme` via `useEffect`, and saves back to `localStorage` on every change.  
No JavaScript style injection — the browser resolves variables natively.

Each theme defines base variables (`--bg`, `--body-color`, `--prompt-color`, …) **and** syntax-highlight variables (`--hl-key`, `--hl-str`, `--hl-num`, `--hl-lit`).

See [THEMES.md](THEMES.md) for the full colour palette of each theme.

---

## JSON syntax highlighting

`Line.tsx` exports a `tokenizeJson(src)` function that splits a pre-formatted JSON string into tokens and assigns CSS classes:

| Class | Variable | Targets |
|---|---|---|
| `.hl-key` | `--hl-key` | Object keys (`"name":`) |
| `.hl-str` | `--hl-str` | String values (`"foo"`) |
| `.hl-num` | `--hl-num` | Numbers (`42`, `3.14`) |
| `.hl-lit` | `--hl-lit` | `true`, `false`, `null` |

Highlighting is applied only to `output` lines. `error` lines render in a single error colour for clarity.

---

## GitHub API

`src/services/github.ts` exports two functions:

- `getRepos()` — fetches `https://api.github.com/users/konradxmalinowski/repos?per_page=100&sort=updated`, filters out forks, populates a module-level cache with a 60-second TTL, and returns the array. Calls within the TTL window return the cached data synchronously.
- `getCachedRepos()` — returns the cache or `null` if not yet populated. Used by autocomplete to avoid a network request on Tab press.

The GitHub unauthenticated API limit is 60 requests/hour. The TTL cache ensures at most one request per minute per page load.

---

## Build & deploy

```bash
npm run build    # tsc -b && vite build → dist/
npm run deploy   # build + gh-pages -d dist (pushes to gh-pages branch)
```

`vite.config.ts` sets `base: '/Portfolio/'` so all asset paths are correct under the GitHub Pages sub-path.

Vite uses **Rolldown** internally (Vite 8). The React Compiler Babel preset (`babel-plugin-react-compiler`) is applied via `@rolldown/plugin-babel` — it automatically memoises components and hooks at compile time without `useMemo`/`useCallback` calls in source.

The `public/` directory is copied to `dist/` verbatim — this is where `robots.txt`, `sitemap.xml`, and `site.webmanifest` live.
