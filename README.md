# 💻 KonradOS CLI – Interactive Developer Portfolio
An interactive portfolio built as a Command Line Interface (CLI) that simulates API behavior.  
Instead of traditional navigation, users interact with the application using commands and receive structured JSON responses.
## 🧠 Concept
This project combines two paradigms:
- **CLI (Command Line Interface)** – user interacts via commands
- **API Simulation** – responses are structured like real backend responses (JSON)
The goal is to present not only projects, but also **how I think as a developer**:
- API design
- data structures
- system interaction
---
## 🚀 Features
- Terminal-style UI (React + TailwindCSS)
- Command-based navigation
- JSON responses for all data
- GitHub API integration (live project data)
- Structured developer profile (skills, experience, education)
- Simulated REST-like endpoints
---
## 🖥️ Example Usage
```bash
> help
> whoami
> projects
> get /projects/galeria
> experience
> contact

Example Response

{
  "name": "galeria",
  "description": "Image gallery with navigation and thumbnails",
  "tech": ["HTML", "CSS", "JavaScript"],
  "features": ["prev/next navigation", "thumbnails", "responsive design"]
}

⸻

🧩 Available Commands

Command	Description
help	List all commands
whoami	Basic developer info
skills	Technical skills grouped by category
projects	List all projects (GitHub API)
get /projects/{name}	Get project details
experience	Work experience
education	Education info
contact	Contact details
clear	Clear terminal

⸻

🏗️ Tech Stack

Frontend

* React
* TailwindCSS

Data

* GitHub REST API
* Static JSON (experience, education)

Concepts

* CLI simulation
* API design
* JSON-based communication

⸻

📁 Project Structure

src/
  components/
    Terminal.jsx
    Line.jsx
  data/
    commands.js
    staticData.js
  services/
    github.js

⸻

🔗 GitHub API Integration

Data is fetched dynamically from:

https://api.github.com/users/konradxmalinowski/repos

Example:

export const getRepos = async () => {
  const res = await fetch("https://api.github.com/users/konradxmalinowski/repos")
  return res.json()
}

⸻

🎯 Purpose

This project is designed to:

* stand out from traditional portfolios
* demonstrate backend thinking in a frontend project
* show understanding of:
    * REST-like structures
    * data modeling
    * user interaction design

⸻

⚠️ Design Principles

* KISS (Keep It Simple)
* No overengineering
* Minimal dependencies
* Clear structure
* Fast and responsive

⸻

🧪 Future Improvements

* Command autocomplete (TAB)
* Command history (↑ / ↓)
* Syntax highlighting
* Theming (light/dark CLI)
* Real backend integration (optional)

⸻

🤖 Claude Prompt (for further development)

Use this prompt in Claude to extend or modify the project:

You are a senior software engineer helping improve a React-based CLI portfolio project.
Project context:
- React + TailwindCSS
- CLI-style interface (terminal simulation)
- Commands return JSON (API-like responses)
- GitHub API is used for projects
- No backend (frontend-only)
- Code should be simple, clean, junior-friendly
- Follow KISS, DRY, SOLID (only where reasonable)
- No overengineering
Your tasks:
1. Always start with a short implementation plan
2. Handle edge cases (invalid commands, empty data, API errors)
3. Keep code readable and simple
4. Avoid unnecessary abstractions
5. One function = one responsibility
6. Validate all inputs
7. Do not introduce complex state management (no Redux)
8. Prefer simple patterns over advanced ones
When implementing features:
- Show full code (not fragments)
- Keep naming simple and consistent
- Use functional components
- Use basic hooks (useState, useEffect)
When adding commands:
- Extend the existing command system
- Keep command parsing simple
- Return consistent JSON format
Example tasks you may receive:
- "add autocomplete to CLI"
- "add new command"
- "improve GitHub API handling"
- "refactor command parser"
Always think like a practical developer, not a theoretician.

⸻

👨‍💻 Author

Konrad Malinowski
Junior Full Stack Developer

* GitHub: https://github.com/konradxmalinowski
* LinkedIn: (add your link)

⸻

📄 License

This project is for portfolio purposes.

---
Jeśli chcesz, mogę teraz:
- dorzucić **README badge + screenshot terminala**
- albo zrobić Ci **gotowy starter repo (pliki + kod)** żebyś tylko odpalił `npm install` i miał działające MVP 🚀