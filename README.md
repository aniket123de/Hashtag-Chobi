# HASHTAG CHOBI Photography Agency Website

## Project Overview
This is a modern, fully responsive photography agency website for HASHTAG CHOBI, built with React, Vite, TypeScript, and Tailwind CSS. The site features elegant branding, a resizable animated navbar, and beautiful typography for a premium user experience.

## Features
- **Modern Resizable Navbar:**
  - Animated, scroll-responsive navbar with mobile hamburger menu
  - Pill-shaped call-to-action button
  - Vertically centered, large logo
  - All navigation and button texts are white for high contrast
- **Branding:**
  - Custom logo and color palette (blush, golden, cream)
  - Elegant fonts: Playfair Display, Crimson Text, Poppins, Montserrat
- **Content Transformation:**
  - All content updated from event planning to photography agency
  - Hero, About, Services, Gallery, Testimonials, Contact, and Footer sections
- **Typography:**
  - Subheadings use elegant/modern fonts for improved aesthetics
  - Google Fonts loaded for all custom font families
- **Accessibility:**
  - High color contrast for navigation and buttons
  - Responsive design for all devices

## Tech Stack
- **React 18**
- **Vite 5**
- **TypeScript**
- **Tailwind CSS 3**
- **Framer Motion** (for navbar animation)
- **@tabler/icons-react** (for icons)

## Key Customizations
- Added webp image support in Vite config
- Replaced all event planning content with photography agency branding
- Navbar: replaced old header with animated, resizable navbar
- Logo: increased size, centered vertically, improved visibility
- Button: pill-shaped, high contrast
- Subheadings: updated to use elegant/modern fonts (Crimson Text, Poppins)
- Google Fonts imported in `index.css`
- Tailwind config extended with custom font families and colors

## File Structure
- `src/components/NewHeader.tsx` — Modern navbar implementation
- `src/components/ui/resizable-navbar.tsx` — Navbar component library
- `src/pages/Index.tsx` — Main page layout
- `src/components/Hero.tsx`, `About.tsx`, `Services.tsx`, `Gallery.tsx`, `Testimonials.tsx`, `Contact.tsx`, `Footer.tsx` — Main sections
- `tailwind.config.ts` — Custom colors and fonts
- `src/index.css` — Global styles and Google Fonts import

## How to Run
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
3. Open [http://localhost:5173](http://localhost:5173) in your browser

## Credits
- Logo and branding: HASHTAG CHOBI
- Fonts: Playfair Display, Crimson Text, Poppins, Montserrat (Google Fonts)
- Icons: Tabler Icons

## Status
- All major UI and branding changes complete
- Ready for further content, gallery, or feature additions

---
For any further customization or feature requests, please open an issue or contact the developer.
