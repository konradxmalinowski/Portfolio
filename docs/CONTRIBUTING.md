# Contributing

This document explains how to run the project locally and how to extend it — adding commands, themes, or static data.

---

## Running locally

```bash
git clone https://github.com/konradxmalinowski/portfolio
cd portfolio
npm install
npm run dev      # starts Vite dev server at http://localhost:5173
```

Other scripts:

```bash
npm run build    # type-check + production build → dist/
npm run preview  # serve the dist/ build locally
npm run lint     # ESLint
```

**Requirements:** Node 18 or later.

---

## Adding a command

Commands are handled by explicit `if` branches inside `handleCommand` in `src/components/Terminal.tsx`. There is no dynamic registry — this is intentional (easy to read, easy to debug).

### 1. Register the command name

Open `src/data/commands.ts` and add one entry to the `COMMANDS` array:

```ts
{ name: 'ping', description: 'Check if the API is alive' },
```

This entry populates the `help` output.

### 2. Add tab-completion (optional)

If the command has no arguments, add its name to the `COMPLETABLE` array near the top of `Terminal.tsx`:

```ts
const COMPLETABLE = [..., 'ping'];
```

If it takes a dynamic argument (like `get /projects/`), add a branch to `computeSuggestion`.

### 3. Implement the handler

Inside `handleCommand`, add an `if` block before the fallback error:

```ts
if (cmd === 'ping') {
  addLine('output', JSON.stringify({ status: 'ok', latency: '0ms' }, null, 2));
  return;
}
```

Use `addLine(type, content)` where `type` is one of:

| Type | Appearance |
|---|---|
| `'output'` | Grey block with coloured left border — for successful JSON responses |
| `'error'` | Red block — for error responses |
| `'info'` | Italic line — for status messages (e.g. "Fetching…") |
| `'input'` | Echoed command — added automatically before your handler runs |

### 4. Update static data (if needed)

If the command returns static data, add it to `src/data/staticData.ts` and import it in `Terminal.tsx`.

---

## Updating personal data

All static content (profile, skills, experience, education, contact, awards) lives in `src/data/staticData.ts`.  
Edit the exported objects/arrays directly — no other files need to change.

### Adding an education entry

```ts
export const education = [
  {
    degree: 'Bachelor of Computer Science',
    school: 'Example University',
    period: '2022 – 2026',
    location: 'Warsaw, Poland',
  },
];
```

### Adding an award

```ts
export const awards = [
  // existing entry...
  {
    title: 'Hackathon Winner',
    issuer: 'Some Organiser',
    date: 'Mar 2026',
    description: 'First place out of 40 teams.',
  },
];
```

---

## Adding a theme

### 1. Define CSS variables

Open `src/index.css` and add a new `[data-theme="..."]` block after the existing themes:

```css
[data-theme="solarized"] {
  --bg:                #002b36;
  --terminal-bg:       #073642;
  --terminal-border:   #586e75;
  --header-bg:         #073642;
  --header-border:     #586e75;
  --title-color:       #657b83;
  --body-color:        #839496;
  --scrollbar:         #586e75;
  --output-bg:         #073642;
  --output-border:     #268bd2;
  --error-color:       #dc322f;
  --error-bg:          #1a0a0a;
  --info-color:        #2aa198;
  --prompt-color:      #859900;
  --input-color:       #268bd2;
  --suggestion-color:  #586e75;
  --caret-color:       #859900;
}
```

Every variable must be present — there is no fallback chain between themes.

### 2. Register the theme name

In `Terminal.tsx`, add the name to the `THEMES` constant:

```ts
const THEMES = ['dark', 'light', 'matrix', 'dracula', 'nord', 'solarized'] as const;
```

That's it — tab-completion, the `theme` command, and `localStorage` persistence all pick it up automatically.

### 3. Document it

Add an entry to [THEMES.md](THEMES.md) with the colour table.

---

## Code conventions

- **No comments** unless the reason is non-obvious (a workaround, a hidden constraint).
- **No new abstractions** unless the same pattern appears 3+ times.
- **TypeScript** — no `any`. Use `unknown` for genuinely unknown shapes and narrow it.
- **Error handling** only at system boundaries: user input and the GitHub API call. Internal logic does not need defensive checks.
- Command handlers must call `return` after `addLine` to prevent falling through to the 404 error.
- Keep `handleCommand` as a flat list of `if` blocks — do not introduce a map/registry pattern.
