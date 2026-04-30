# Command Reference

Every command returns a JSON response (or a plain message for meta-commands like `clear`).  
Tab-completion and ↑/↓ history work for all commands.

---

## `help`

Lists all available commands and their descriptions.

```
$ help
{
  "help": "List all available commands",
  "whoami": "Basic developer info",
  "skills": "Technical skills grouped by category",
  "projects": "List all projects from GitHub",
  "get /projects/{name}": "Get details of a specific project",
  "experience": "Work experience",
  "education": "Education info",
  "awards": "Awards and recognitions",
  "contact": "Contact details",
  "clear": "Clear terminal",
  "theme": "List available themes or set one: theme <name>",
  "stats": "Aggregate GitHub stats (repos, languages, stars)",
  "health": "Check app and GitHub API status"
}
```

---

## `whoami`

Returns the developer's personal profile.

```
$ whoami
{
  "name": "Konrad Malinowski",
  "role": "Full-Stack Engineer & Technical Consultant",
  "description": "I design and build scalable web applications for businesses that need reliable, modern technology solutions.",
  "location": "Zduńska Wola, Poland",
  "github": "https://github.com/konradxmalinowski",
  "linkedin": "https://linkedin.com/in/konradxmalinowski",
  "email": "malinowski.konrad45@gmail.com",
  "status": "Accepting new projects — response time within 24 hours"
}
```

---

## `skills`

Returns all technical skills grouped by category.

```
$ skills
{
  "frontend": ["HTML5", "CSS3", "SASS", "JavaScript", "TypeScript", "React", "React Native", "Redux", "Angular", "Tailwind CSS", "Bootstrap"],
  "backend": ["Node.js", "Express.js", "Java", "Spring Boot", "Hibernate", "Python", "PHP", ".NET", "REST APIs", "Microservices"],
  "databases": ["MySQL", "PostgreSQL", "MariaDB", "MS SQL Server", "SQLite", "Redis"],
  "tools": ["Git", "GitHub", "GitLab", "Docker", "RabbitMQ", "Maven", "ESLint", "Linux", "Bash", "Postman", "Swagger", "Figma", "WordPress", "Proxmox"]
}
```

---

## `projects`

Fetches all non-fork repositories from GitHub (live data, sorted by last updated).  
The cache has a 60-second TTL; subsequent calls within that window skip the network request.

```
$ projects
[
  {
    "name": "Portfolio",
    "description": "Interactive CLI developer portfolio",
    "language": "TypeScript",
    "stars": 0,
    "url": "https://github.com/konradxmalinowski/Portfolio"
  },
  ...
]
[200 OK] 12 repositories · 342ms · source: github
```

**Error response** (GitHub API unavailable):

```json
{
  "error": "GitHub API error: 403 Forbidden",
  "status": 503
}
```

---

## `get /projects/{name}`

Returns full details for a single repository. The name is case-insensitive.  
Tab-completion works after `get /projects/` once the cache is populated.

Add `--open` to also open the repository URL in a new browser tab.

```
$ get /projects/Portfolio
{
  "name": "Portfolio",
  "description": "Interactive CLI developer portfolio",
  "language": "TypeScript",
  "stars": 0,
  "topics": ["react", "typescript", "cli"],
  "url": "https://github.com/konradxmalinowski/Portfolio"
}
[200 OK] 1ms · source: cache
```

```
$ get /projects/Portfolio --open
# same JSON output, repo opens in browser
[200 OK] 1ms · source: cache · opened in browser
```

**Error — project not found:**

```json
{
  "error": "Not Found",
  "message": "Project \"foo\" does not exist",
  "status": 404
}
```

**Error — name missing:**

```json
{
  "error": "Bad Request",
  "message": "Project name is required",
  "usage": "get /projects/{name} [--open]"
}
```

---

## `experience`

Returns the full work history as a JSON array.

```
$ experience
[
  {
    "role": "Junior Full-Stack Engineer",
    "company": "AIBron",
    "period": "Jan 2026 – Present",
    "type": "Contract",
    "location": "Zduńska Wola · Hybrid",
    "description": [...]
  },
  {
    "role": "Intern Full-Stack Engineer",
    "company": "AIBron",
    "period": "Aug 2025 – Jan 2026",
    "type": "Internship",
    ...
  },
  {
    "role": "WordPress Developer",
    "company": "ZSE Zduńska Wola",
    "period": "May 2023 – Present",
    "type": "Freelance",
    ...
  }
]
```

---

## `education`

Returns the education history.

```
$ education
[
  {
    "degree": "Technik Programista",
    "school": "Zespół Szkół Elektronicznych w Zduńskiej Woli",
    "period": "Sep 2023 – Apr 2028",
    "location": "Zduńska Wola, Poland",
    "qualifications": ["INF.03", "INF.04"],
    "description": [...],
    "skills": ["HTML", "CSS", "JavaScript", "SQL", "MySQL", "PHP", "Python"]
  }
]
```

---

## `awards`

Returns awards and recognitions.

```
$ awards
[
  {
    "title": "APPetyt for studying in Łódź — Finalist",
    "issuer": "University of Łódź",
    "date": "Nov 2025",
    "description": "Competed at Łódź IT Days at the Faculty of Mathematics and Computer Science. Presented a mobile application promoting studying in Łódź — selected as one of 3 finalists out of 13 teams."
  }
]
```

---

## `contact`

Returns contact details and availability.

```
$ contact
{
  "email": "malinowski.konrad45@gmail.com",
  "github": "https://github.com/konradxmalinowski",
  "linkedin": "https://linkedin.com/in/konradxmalinowski",
  "availability": "Accepting new projects. Response time: within 24 hours."
}
```

---

## `stats`

Fetches all repositories and computes aggregate statistics. Uses the same 60-second cache as `projects`.

```
$ stats
{
  "total_repos": 12,
  "most_used_language": "JavaScript",
  "total_stars": 3,
  "languages": {
    "JavaScript": 5,
    "TypeScript": 3,
    "Java": 2,
    "PHP": 1,
    "Python": 1
  }
}
[200 OK] 1ms · source: cache
```

---

## `health`

Pings the GitHub API and reports system status and round-trip latency.

```
$ health
{
  "status": "ok",
  "github_api": "reachable",
  "latency_ms": 187,
  "app_version": "1.0.0"
}
```

---

## `theme`

Without an argument — lists available themes and shows the current one.

```
$ theme
{
  "available": ["dark", "light", "matrix", "dracula", "nord"],
  "current": "dark"
}
```

With an argument — switches the theme immediately. The selection persists across page reloads via `localStorage`.

```
$ theme matrix
{
  "message": "Theme set to \"matrix\"",
  "theme": "matrix"
}
```

**Error — unknown theme:**

```json
{
  "error": "Unknown theme",
  "available": ["dark", "light", "matrix", "dracula", "nord"]
}
```

Tab-completion works for theme names: typing `theme d` + Tab completes to `theme dark`.  
See [THEMES.md](THEMES.md) for a full description of each theme.

---

## `clear`

Clears all terminal output and resets to the welcome message. Does not produce a JSON response.

---

## Unknown command

Any unrecognised input returns a 404-style error. When the typo is close to a known command (Levenshtein distance ≤ 2), a suggestion is shown:

```
$ projcts
{
  "error": "Command not found",
  "command": "projcts",
  "hint": "did you mean: \"projects\"?",
  "status": 404
}
```

When no close match exists:

```json
{
  "error": "Command not found",
  "command": "foo",
  "hint": "Type \"help\" to see available commands",
  "status": 404
}
```

---

## Keyboard shortcuts

| Key | Action |
|---|---|
| `Tab` | Autocomplete command or argument |
| `Enter` | Execute command |
| `↑` | Previous command in history |
| `↓` | Next command in history |
| Click anywhere | Focus the input |
