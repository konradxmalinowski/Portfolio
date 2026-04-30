# KonradOS CLI — Interactive Developer Portfolio

An interactive portfolio built as a terminal emulator. Instead of clicking through pages, visitors type commands and receive structured JSON responses — the same way a developer talks to an API.

```
$ whoami
{
  "name": "Konrad Malinowski",
  "role": "Full-Stack Engineer & Technical Consultant",
  "location": "Zduńska Wola, Poland",
  ...
}
```

**Live demo:** https://konradxmalinowski.github.io/Portfolio/

---

## Quick start

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build → dist/
npm run deploy   # build + push to GitHub Pages
```

**Requirements:** Node 18+

---

## What you can do

Type any command and press Enter. Press Tab to autocomplete. Use ↑ / ↓ to navigate history.

| Command | What it returns |
|---|---|
| `help` | All available commands |
| `whoami` | Developer profile |
| `skills` | Tech stack grouped by category |
| `projects` | GitHub repositories (live data) |
| `get /projects/{name}` | Single project details |
| `get /projects/{name} --open` | Project details + opens repo in browser |
| `experience` | Work history |
| `education` | Education |
| `awards` | Awards & recognitions |
| `contact` | Contact info |
| `stats` | GitHub aggregate stats (repos, languages, stars) |
| `health` | App and GitHub API status check |
| `theme` | List available themes |
| `theme <name>` | Switch appearance |
| `clear` | Clear the terminal |

**Themes:** `dark` · `light` · `matrix` · `dracula` · `nord`

---

## Tech stack

| Layer | Technology |
|---|---|
| UI framework | React 19 |
| Language | TypeScript |
| Bundler | Vite 8 |
| Styling | Plain CSS with custom properties |
| Compiler | React Compiler (Babel) |
| External data | GitHub REST API |
| Deploy | GitHub Pages (`gh-pages`) |

No UI library, no state management library, no CSS framework.

---

## Documentation

| File | Contents |
|---|---|
| [docs/COMMANDS.md](docs/COMMANDS.md) | Every command with full sample output |
| [docs/THEMES.md](docs/THEMES.md) | Theme guide with color palettes |
| [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) | File structure and data flow |
| [docs/CONTRIBUTING.md](docs/CONTRIBUTING.md) | How to add commands, themes, run locally |

---

## Author

**Konrad Malinowski** — Full-Stack Engineer & Technical Consultant

- GitHub: [github.com/konradxmalinowski](https://github.com/konradxmalinowski)
- LinkedIn: [linkedin.com/in/konradxmalinowski](https://linkedin.com/in/konradxmalinowski)
- Email: malinowski.konrad45@gmail.com

---

## License

MIT — free to use as a template or inspiration.
