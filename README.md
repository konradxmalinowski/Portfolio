# Portfolio Website

Modern, animated portfolio website built with React, TypeScript, Vite, Tailwind CSS, and Framer Motion.

## Features

- **Animated Hero Section** - Pulsing avatar, gradient text, rotating decorative elements
- **About Section** - Personal introduction with hover effects
- **Tech Stack Section** - Categorized skills with interactive cards
- **Contact Form** - EmailJS integration for direct messages
- **Scroll Progress Bar** - Visual indicator of page scroll
- **Animated Background** - Floating particles and gradient orbs
- **Social Links** - GitHub, LinkedIn, Email
- **Fully Responsive** - Works on all devices
- **Modern Animations** - Framer Motion powered interactions

## Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **EmailJS** - Contact form functionality

## Installation

1. Clone the repository:
```bash
git clone https://github.com/konradxmalinowski/portfolio.git
cd portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Setup EmailJS (optional, for contact form):
   - Follow instructions in `EMAILJS_SETUP.md`
   - Update credentials in `src/components/Contact.tsx`

4. Run development server:
```bash
npm run dev
```

5. Open [http://localhost:5173](http://localhost:5173)

## Build for Production

```bash
npm run build
```

## Deploy to GitHub Pages

1. Update `base` in `vite.config.ts`:
   ```typescript
   base: '/your-repo-name/',  // Change to your repository name
   ```

2. Build and deploy:
   ```bash
   npm run build
   npm run deploy
   ```

Your site will be live at `https://yourusername.github.io/your-repo-name/`

## Customization

### Update Personal Information

**Hero Section** (`src/components/Hero.tsx`):
- Change name and initials
- Update social media links (GitHub, LinkedIn, Email)

**About Section** (`src/components/About.tsx`):
- Edit personal description

**Skills Section** (`src/components/Skills.tsx`):
- Modify skill categories and technologies

**Contact Section** (`src/components/Contact.tsx`):
- Update email address
- Configure EmailJS credentials

### Styling

All colors and styles can be customized in:
- `tailwind.config.ts` - Global theme configuration
- Individual component files - Component-specific styles

## Project Structure

```
portfolio/
├── src/
│   ├── components/
│   │   ├── AnimatedBackground.tsx  # Background animations
│   │   ├── ScrollProgress.tsx      # Scroll indicator
│   │   ├── Hero.tsx                # Landing section
│   │   ├── About.tsx               # About me section
│   │   ├── Skills.tsx              # Tech stack section
│   │   └── Contact.tsx             # Contact form
│   ├── App.tsx                     # Main app component
│   ├── main.tsx                    # Entry point
│   └── index.css                   # Global styles
├── public/
├── index.html
├── vite.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

## License

MIT

## Contact

Konrad Malinowski
- Email: malinowski.konrad45@gmail.com
- GitHub: [@konradxmalinowski](https://github.com/konradxmalinowski)
- LinkedIn: [konrad-malinowski](https://linkedin.com/in/konradxmalinowski)
