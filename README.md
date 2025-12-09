# Professional Portfolio Website

A modern, fully bilingual (EN/PL) portfolio website showcasing professional experience, technical skills, and service offerings. Built with React 19, TypeScript, and powered by smooth Framer Motion animations.

**Live Demo:** [konradxmalinowski.github.io/Portfolio](https://konradxmalinowski.github.io/Portfolio)

## Key Features

### Multilingual Support
- **Full bilingual implementation** (English/Polish) with context-based translations
- Automatic browser language detection
- Persistent language preference in localStorage
- 250+ translation strings covering all UI elements

### Professional Sections
- **Hero Section** - Animated profile photo with pulsing glow effect, gradient text, and rotating decorative elements
- **About** - Personal introduction with highlighted key characteristics
- **Services** - 6 professional service offerings with detailed feature lists
  - Landing Pages
  - Portfolio Websites
  - WordPress Development
  - Full-Stack Applications
  - Website Optimization
  - Database Design & Management
- **Experience Timeline** - Dynamic work history with:
  - Real-time duration calculation
  - Current position badges
  - Skill tags for each role
  - Responsive timeline visualization
- **Tech Stack** - Categorized skills display (Frontend, Backend, Databases, Tools)
- **Contact** - Functional contact form with EmailJS integration

### UI/UX Features
- Scroll progress indicator
- Animated background with floating particles and gradient orbs
- Smooth section transitions
- Fully responsive design with mobile-optimized styles
- Accessible ARIA labels and semantic HTML
- Glass-morphism design elements

## Tech Stack

- **React 19** - Latest React with modern hooks
- **TypeScript** - Full type safety
- **Vite 7.2** - Fast build tool and dev server
- **Tailwind CSS 3.4** - Utility-first styling
- **Framer Motion 11** - Advanced animations
- **EmailJS** - Contact form backend

## Installation

```bash
# Clone the repository
git clone https://github.com/konradxmalinowski/portfolio.git
cd portfolio

# Install dependencies
npm install

# Start development server
npm run dev
```

The site will be available at `http://localhost:5173`

## Configuration

### EmailJS Setup (Optional)

For the contact form to work:

1. Create an account at [EmailJS](https://www.emailjs.com/)
2. Follow the setup guide in `EMAILJS_SETUP.md`
3. Update credentials in `src/components/Contact.tsx`:
   ```typescript
   const serviceId = 'your_service_id'
   const templateId = 'your_template_id'
   const publicKey = 'your_public_key'
   ```

### Customization Guide

**Personal Information:**
- `src/contexts/LanguageContext.tsx` - Update all translation strings (lines 14-251)
- `src/components/Hero.tsx` - Replace profile photo at line 3: `import pfp from '../assets/pfp.jpg'`
- `src/components/Experience.tsx` - Update work experience array (lines 23-46)

**Services Offered:**
- `src/components/Services.tsx` - Modify services array (lines 10-71)
- Update corresponding translations in `LanguageContext.tsx`

**Tech Stack:**
- `src/components/Skills.tsx` - Update skill categories and items

**Styling:**
- `tailwind.config.ts` - Global theme configuration
- `src/index.css` - Base styles and custom utilities
- `src/styles/mobile.css` - Mobile-specific overrides

**Deployment:**
- `vite.config.ts` - Update `base` path to match your repository name (currently `/Portfolio/`)
- `package.json` - Update `homepage` field (line 2)

## Build & Deploy

```bash
# Build for production
npm run build

# Preview production build locally
npm run preview

# Deploy to GitHub Pages
npm run deploy
```

**GitHub Pages Configuration:**
1. Ensure `base` in `vite.config.ts` matches your repo name
2. Enable GitHub Pages in repository settings (Settings > Pages)
3. Select `gh-pages` branch as source
4. Site will be live at `https://<username>.github.io/<repo-name>/`

## Project Structure

```
portfolio/
├── src/
│   ├── components/
│   │   ├── AnimatedBackground.tsx    # Floating particles & gradient orbs
│   │   ├── ScrollProgress.tsx        # Page scroll indicator
│   │   ├── LanguageSwitcher.tsx      # EN/PL language toggle
│   │   ├── Hero.tsx                  # Landing section with profile
│   │   ├── About.tsx                 # Personal introduction
│   │   ├── Services.tsx              # Service offerings showcase
│   │   ├── Experience.tsx            # Professional timeline
│   │   ├── Skills.tsx                # Tech stack display
│   │   ├── Contact.tsx               # Contact form with EmailJS
│   │   └── Footer.tsx                # Footer section
│   ├── contexts/
│   │   └── LanguageContext.tsx       # Bilingual translation system
│   ├── styles/
│   │   └── mobile.css                # Mobile-specific styles
│   ├── assets/
│   │   └── pfp.jpg                   # Profile photo
│   ├── App.tsx                       # Main component orchestration
│   ├── main.tsx                      # Application entry point
│   └── index.css                     # Global styles
├── public/
│   ├── vite.svg                      # Favicon
│   ├── robots.txt                    # SEO crawler instructions
│   ├── sitemap.xml                   # SEO sitemap
│   └── google*.html                  # Google Search Console verification
├── dist/                             # Production build output (gitignored)
├── index.html                        # HTML entry point
├── vite.config.ts                    # Vite configuration
├── tailwind.config.ts                # Tailwind theme config
├── tsconfig.json                     # TypeScript config
├── package.json                      # Dependencies & scripts
├── EMAILJS_SETUP.md                  # EmailJS setup guide
└── README.md
```

## Development Notes

- Language switching preserves user preference across sessions
- Experience duration updates every minute for accuracy
- All animations respect `prefers-reduced-motion` (Framer Motion default)
- TypeScript strict mode enabled for maximum type safety
- Component-based architecture for easy maintenance

## Browser Support

- Chrome/Edge (last 2 versions)
- Firefox (last 2 versions)
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Android)

## License

MIT License - see [LICENSE](LICENSE) file for details

## Contact

Konrad Malinowski
- **Email:** malinowski.konrad45@gmail.com
- **GitHub:** [@konradxmalinowski](https://github.com/konradxmalinowski)
- **LinkedIn:** [konradxmalinowski](https://linkedin.com/in/konradxmalinowski)

---

**Built with passion using React, TypeScript, and modern web technologies.**
