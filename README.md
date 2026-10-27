# Hafsaa Ouifak — AI, with understanding.

A dark, interactive research portfolio built for GitHub Pages. Plain HTML, CSS, and JavaScript, with no runtime dependencies, API keys, analytics, or external asset requests.

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

The intended repository is `HafsaaOuifak/HafsaaOuifak.github.io`. Before creating it, check whether it already exists and preserve any existing work. Once the files are committed to `main`, choose **Settings → Pages → Build and deployment → Source → GitHub Actions**. The included workflow validates, packages, and deploys the site. The user-site URL will be `https://hafsaaouifak.github.io/` after a successful deployment; this is an intended URL, not evidence that publication has happened.

## Edit content

- `content.js`: projects, publication records and statuses, career and education timelines.
- `index.html`: introduction, LinkedIn cards, community section, and contact links.
- `styles.css`: colors, typography, layout, responsive rules, and reduced-motion support.
- `app.js`: project dialog, filters, search, clipboard, animation, and the fuzzy-logic experiment.

The fuzzy demo is educational: overlapping membership functions are not probabilities. The neural sculpture is decorative and can be paused; it also respects reduced-motion preferences and stops when offscreen. Project dialogs support Escape, keyboard focus, and focus restoration. All photos and fonts are served locally.

Content reflects the supplied October 2026 CV. The expected Ph.D. date and papers under review remain explicitly labeled. The original CV file is excluded from the public repository; visitors can follow the academic profile link. `SOURCES.md` records content sources, image provenance, and font licenses.
