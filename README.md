# TechOva Solutions — Company Website

A modern, animated marketing website for **TechOva Solutions** — AI-powered software development for enterprises. Showcases services, flagship products (CV Builder Max & Japap), and a contact form.

## Tech Stack

| Layer | Choice | Why |
|-------|--------|-----|
| Build tool | [Vite](https://vitejs.dev/) | Fast dev server, optimized static output |
| Styling | Vanilla CSS | No framework bloat, full control over animations |
| JavaScript | Vanilla ES modules | Lightweight, no runtime dependencies |
| Hosting | Static files + PHP | Perfect for cPanel shared hosting |

## Features

- Animated hero with particle network and floating dashboard mockup
- Scroll-reveal animations and animated stat counters
- Responsive design (mobile, tablet, desktop)
- Product showcases for CV Builder Max and Japap
- Contact form with PHP mail handler for cPanel
- SEO meta tags, accessibility, and reduced-motion support

## Local Development

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:5173)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Deploy to cPanel

1. **Build the site locally:**
   ```bash
   npm run build
   ```

2. **Upload to cPanel:**
   - Open **File Manager** in cPanel
   - Navigate to `public_html` (or your domain's document root)
   - Upload **all contents** of the `dist/` folder (not the folder itself)

3. **Verify these files are in `public_html`:**
   - `index.html`
   - `assets/` folder (CSS & JS)
   - `favicon.svg`
   - `contact.php`
   - `.htaccess`

4. **Configure the contact form:**
   - Edit `contact.php` and set `$to_email` to your real inbox address

5. **Enable SSL** (recommended):
   - Use cPanel's **SSL/TLS** or **Let's Encrypt** to enable HTTPS
   - Uncomment the HTTPS redirect lines in `.htaccess`

## Project Structure

```
techovasolutions/
├── index.html          # Main page
├── src/
│   ├── main.js         # Animations, nav, form handling
│   └── styles/
│       └── main.css    # All styles
├── public/
│   ├── favicon.svg
│   ├── contact.php     # Form handler (copied to dist on build)
│   └── .htaccess       # Apache config (copied to dist on build)
├── vite.config.js
└── package.json
```

## Customization

- **Colors & branding:** Edit CSS variables in `src/styles/main.css` (`:root` block)
- **Content:** Edit `index.html` directly
- **Contact email:** Update in `index.html`, `public/contact.php`, and footer links
- **Stats numbers:** Change `data-count` attributes in the hero section

## Browser Support

Chrome, Firefox, Safari, Edge — last 2 major versions. Graceful degradation for older browsers.

## Git Workflow

This repository uses a **main + devtechova** branching model:

| Branch | Purpose |
|--------|---------|
| `main` | Production-ready code. Protected — changes land only via pull request. |
| `devtechova` | Active development branch for all day-to-day commits. |

### Day-to-day development

```bash
git checkout devtechova
# make changes
git add .
git commit -m "your message"
git push origin devtechova
```

### Merging to production

1. Open a **Pull Request** from `devtechova` → `main` on GitHub.
2. Wait for the **CI** workflow (build & verify) to pass.
3. Review and merge the PR.

### CI

GitHub Actions runs on every push to `main` or `devtechova`, and on every pull request targeting `main`. It installs dependencies, runs `npm run build`, and uploads the `dist/` artifact.

---

Built by TechOva Solutions. *Intelligence. Delivered with precision.*
