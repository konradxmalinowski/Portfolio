export const COMMANDS = [
  { name: 'help', description: 'List all available commands' },
  { name: 'whoami', description: 'Basic developer info' },
  { name: 'skills', description: 'Technical skills grouped by category' },
  { name: 'projects', description: 'List all projects from GitHub' },
  { name: 'get /projects/{name}', description: 'Get details of a specific project' },
  { name: 'experience', description: 'Work experience' },
  { name: 'education', description: 'Education info' },
  { name: 'awards', description: 'Awards and recognitions' },
  { name: 'contact', description: 'Contact details' },
  { name: 'clear', description: 'Clear terminal' },
  { name: 'theme', description: 'List available themes or set one: theme <name>' },
] as const;
