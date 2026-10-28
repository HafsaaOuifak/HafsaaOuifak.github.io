# Hafsaa Ouifak — AI, with understanding.

A navy-blue, interactive research portfolio built for GitHub Pages. Plain HTML, CSS, and JavaScript, with no runtime dependencies, API keys, analytics, or external asset requests.

## Preview

With Node.js 18 or newer:

```sh
npm start
```

Open http://127.0.0.1:4173. Or open `index.html` directly; copying the email address may need the local server.

## Check and build

```sh
npm run check
npm run build
```

The publishable site is in `dist/`. Relative asset paths support either a user site or a project site.

## GitHub Pages

The repository is `HafsaaOuifak/HafsaaOuifak.github.io`, and GitHub Pages uses GitHub Actions. Push updates to `main`; the included workflow validates, packages, and deploys the site at https://hafsaaouifak.github.io/. Preserve the repository and existing work when editing.

## Edit content

- `content.js`: projects, publication records and reading guides, activity galleries with source links, and career and education timelines.
- `index.html`: introduction, LinkedIn cards, community section, and contact links.
- `styles.css`: colors, typography, layout, responsive rules, and reduced-motion support.
- `app.js`: project notes, a publication library with topic/status filters, search, sorting, featured-paper carousel, reference copying, activity filters and keyboard photo viewer, navigation, animation, and the fuzzy-logic experiment.

The fuzzy demo is educational: overlapping membership functions are not probabilities. The neural sculpture is decorative and can be paused; it also respects reduced-motion preferences and stops when offscreen. Project dialogs support Escape, keyboard focus, and focus restoration. All photos and fonts are served locally.

Content reflects the supplied October 2026 CV. The expected Ph.D. date and papers under review remain explicitly labeled. The original CV file is excluded from the public repository; visitors can follow the academic profile link. `SOURCES.md` records content sources, image provenance, and font licenses.
