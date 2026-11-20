# Durga Prasad Gadi — Developer Portfolio

A responsive React and Vite portfolio with a deep-navy glassmorphism design, balanced CSS 3D-inspired motion, scroll-triggered reveals, an application architecture showcase, and Simple Icons technology logos. The design takes broad inspiration from the supplied visual reference while keeping the content and assets specific to Durga Prasad Gadi.

## 1. Requirements
- Node.js 18.18+ (Node.js 20 LTS recommended)
- npm
- VS Code (recommended)

Check your versions:
```bash
node -v
npm -v
```

## 2. Run locally
Open this folder in VS Code or a terminal:
```bash
npm install
npm run dev
```
Vite prints a local URL, usually `http://localhost:5173`. Open it in your browser.

## 3. Production build
```bash
npm run build
npm run preview
```
The production website is generated in the `dist/` folder.

## 4. Personalize before publishing
Update `src/data/portfolio.js` to change:
- Phone, email and location.
- Skill groups, employment information and education.
- CGPA against your degree certificate and final marks memo.

Update `src/data/projects.js` to change project descriptions, links, screenshots and your contribution. Add a LinkedIn URL to the `profile` object in `src/data/portfolio.js` when available. The project cards distinguish ManaAqua ownership from professional contributions.

Before publishing, confirm the employment title, company, responsibilities and education details against your records. Employment dates are currently omitted because they were not verified.

### Add your resume PDF
Copy your latest resume into `public/` and name it exactly:
`Durga-Prasad-Gadi-Resume.pdf`

Then the Resume PDF button will work. If you prefer a different filename, update the link in `src/main.jsx`.

### Replace illustrative project photos
The current project cards use illustrative stock photos. To use real product screenshots instead, replace the matching images in `public/images/` with approved, optimized screenshots. Do not expose customer names, employee records, payroll data, credentials, private URLs or other confidential information.

### Add a LinkedIn URL
Set `linkedin` in `src/data/portfolio.js` to your public profile URL when you have it. The site omits the LinkedIn link while that value is empty.

## 5. Deploy
### Vercel
1. Push this project to a GitHub repository.
2. Sign in to Vercel and import the repository.
3. Framework preset: Vite.
4. Build command: `npm run build`.
5. Output directory: `dist`.
6. Deploy and connect your custom domain if you own one.

### Netlify
1. Import the GitHub repository.
2. Build command: `npm run build`.
3. Publish directory: `dist`.
4. Deploy.

## 6. Project structure
```text
durga-prasad-portfolio/
├── public/
│   ├── Durga-Prasad-Gadi-Resume.pdf
│   ├── durga-prasad-portrait.png
│   ├── favicon.svg
│   └── images/                 # locally stored project preview photos
├── src/
│   ├── components/
│   │   └── ArchitectureShowcase.jsx
│   ├── data/
│   │   ├── portfolio.js
│   │   └── projects.js
│   ├── main.jsx
│   └── styles.css
├── index.html
├── package.json
└── README.md
```

## 7. Notes
- This is a static portfolio; no backend or database is required.
- Project preview photos are illustrative Unsplash stock imagery, stored locally in `public/images/`; they are not screenshots of the products.
- Contact links use `mailto:` and `tel:`. A working form with message storage/email delivery requires a form service or backend.
- The portfolio does not claim quantified performance improvements or unsupported client results.
- Scroll and hover animations respect the visitor's reduced-motion preference.
- Recognizable technology brand icons are rendered from the Simple Icons package alongside their labels.
- Private biometric and healthcare work is intentionally shown without public demo links.
