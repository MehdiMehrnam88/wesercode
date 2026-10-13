# WeserCode build verification — latest refinement

## Updated
- Supplied team portraits are copied into `public/team/` and referenced by `data/team.ts`.
- TeamGrid no longer uses the `KONZEPTPROFIL` label.
- Navigation text uses theme-safe contrast and translucent glass pills.
- Services and Process banners remain full-viewport and continue behind the transparent navigation.
- AI Readiness now presents a live 0–100% score in the primary result display.
- Existing video background, banners, Bremen visual pages, contact/map, legal pages, and STRATO deployment files are preserved.

## Static validation
- TypeScript/TSX source was parsed/transpiled with the local TypeScript compiler API.
- Team image references were checked against the files in `public/team/`.
- ZIP integrity was verified after packaging.

## Full production build
A full `npm run build` still requires installing the project's npm dependencies in a networked environment; this preparation sandbox does not have a reliable npm registry connection.


## Latest navbar revision — 2026-09-29
- One compact glass navbar system is now used on every page.
- Desktop navigation links have no background circles/pills, no borders and no individual glass capsules.
- Light theme navigation links are black and underlined.
- Dark theme navigation links are white and underlined.
- Services and Process keep their full-screen banners beneath the fixed navbar; their navbar fill and blur are reduced so the image remains visible through it.
- The mobile dropdown remains a contained glass panel for usable touch navigation.
