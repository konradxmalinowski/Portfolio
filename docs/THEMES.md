# Themes

KonradOS ships with 5 built-in themes. Switch with the `theme <name>` command.  
The active theme is persisted in `localStorage` under the key `konrados-theme` and survives page reloads.

Themes are implemented as CSS custom properties on the `body[data-theme="..."]` selector — no JavaScript style injection.

---

## Switching themes

```
$ theme <name>       # set a theme
$ theme              # list all themes and show the current one
```

Tab-completion works: type `theme ` and press Tab to cycle through names.

---

## Available themes

### `dark` (default)

Classic terminal aesthetic. Dark charcoal background, VSCode-inspired syntax colours.

| Role | Colour |
|---|---|
| Background | `#0d0d0d` |
| Terminal body | `#1c1c1c` |
| Text | `#d4d4d4` |
| Prompt `$` | `#4ec9b0` (teal) |
| Input text | `#9cdcfe` (light blue) |
| Output border | `#4a9eff` (blue) |
| Error | `#f48771` (salmon) |
| Info / italic | `#7ec8e3` (sky blue) |

---

### `light`

High-contrast white theme. Suitable for bright environments.

| Role | Colour |
|---|---|
| Background | `#f0f0f0` |
| Terminal body | `#ffffff` |
| Text | `#1a1a1a` |
| Prompt `$` | `#008060` (dark teal) |
| Input text | `#005f9e` (dark blue) |
| Output border | `#0078d4` (Microsoft blue) |
| Error | `#c62828` (dark red) |
| Info / italic | `#0277bd` (dark sky) |

---

### `matrix`

Pure black background with neon green text. Inspired by The Matrix.

| Role | Colour |
|---|---|
| Background | `#000000` |
| Terminal body | `#020802` |
| Text | `#00cc33` |
| Prompt `$` | `#00ff41` (neon green) |
| Input text | `#00cc33` |
| Output border | `#00ff41` |
| Error | `#ff4444` |
| Info / italic | `#00ff41` |

---

### `dracula`

The popular Dracula colour scheme — purple and pink accents on a dark blue-grey base.

| Role | Colour |
|---|---|
| Background | `#1e1e2e` |
| Terminal body | `#282a36` |
| Text | `#f8f8f2` |
| Prompt `$` | `#50fa7b` (green) |
| Input text | `#8be9fd` (cyan) |
| Output border | `#bd93f9` (purple) |
| Error | `#ff5555` |
| Info / italic | `#ff79c6` (pink) |

---

### `nord`

Inspired by the Nord palette — cool Arctic blues and soft whites.

| Role | Colour |
|---|---|
| Background | `#242933` |
| Terminal body | `#2e3440` |
| Text | `#d8dee9` |
| Prompt `$` | `#a3be8c` (sage green) |
| Input text | `#88c0d0` (glacial blue) |
| Output border | `#81a1c1` (steel blue) |
| Error | `#bf616a` (dusty red) |
| Info / italic | `#88c0d0` |

---

## Adding a new theme

See [CONTRIBUTING.md](CONTRIBUTING.md#adding-a-theme).
