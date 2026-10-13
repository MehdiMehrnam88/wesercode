# WeserCode website foundation

A production-oriented Next.js App Router foundation for WeserCode, implemented from the supplied specification.

## Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Modern CSS without a utility framework
- Next.js Route Handler for `POST /api/contact`
- SMTP or Resend email provider abstraction

Next.js 16 is currently in Active LTS, and the App Router/Route Handlers are the current full-stack path documented by Next.js. Keep the package versions under normal security/update review before production deployment.

## Run locally

1. Install Node.js 22 LTS or another Node version supported by the selected Next.js release.
2. Copy `.env.example` to `.env.local`.
3. Configure one email provider.
4. Run:

```bash
npm install
npm run dev
```

Open http://localhost:3000.

Build for production:

```bash
npm run build
npm start
```

## Email configuration

The contact form uses the real `/api/contact` endpoint. It validates input server-side, checks the request origin, rate-limits by IP, uses a honeypot, and returns a failure response when email delivery is not configured or fails.

### SMTP

Set:

- `EMAIL_PROVIDER=smtp`
- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_USER`
- `SMTP_PASS`
- `SMTP_FROM`
- optionally `CONTACT_TO` (defaults to `hello@wesercode.de`)

### Resend

Set:

- `EMAIL_PROVIDER=resend`
- `RESEND_API_KEY`
- `RESEND_FROM`
- optionally `CONTACT_TO`

Never commit secrets. `.env*` files are ignored by Git.

## Google Maps

The contact page offers a Google Maps embed for **Rotdornpfad 31, 28355 Bremen, Germany**. Google Maps is loaded only after the visitor selects the map.

## Analytics & consent

The existing WeserCode GA4 measurement ID `G-5HK9RTXSSH` is preserved in `components/Analytics.tsx`. Google Analytics is not loaded until the visitor explicitly allows optional analytics. A “necessary only” path leaves analytics disabled.

Before the real site goes live, review the exact consent/legal setup for the intended jurisdiction and tracking configuration.

## SEO

Included:

- language-aware titles/descriptions
- canonical URLs and `hreflang` alternates
- Open Graph metadata on core pages
- JSON-LD organization/service data
- `sitemap.xml`
- `robots.txt`
- semantic headings and descriptive links
- preserved Bing verification value from the supplied specification

The Bing verification meta tag is preserved directly in `app/layout.tsx` via the Metadata API and must not be removed during migration.

## Company/legal configuration

Known facts are centralized in `lib/i18n.ts` and the legal pages deliberately avoid inventing missing registration data.

Update when verified data is available:

- legal company name
- exact street address
- responsible/legal representative
- registration number
- VAT details
- verified team information
- verified portfolio/case studies
- social links
- exact contact details beyond the known email

The current site uses `Bremen, Germany` at city level.

## Real logo asset

`public/brand/wesercode-logo.png` is the supplied WeserCode logo with transparent background. `public/brand/wesercode-logo-light.png` is a theme-safe variant with the same supplied mark and dark wordmark for light surfaces. The header/footer switch between the two automatically. `public/brand/wesercode-mark.png` is used for the favicon.

## Structure

```text
app/
  api/contact/route.ts
  about/page.tsx
  contact/page.tsx
  faq/page.tsx
  imprint/page.tsx
  privacy/page.tsx
  process/page.tsx
  services/page.tsx
  en/...
  page.tsx
  robots.ts
  sitemap.ts
components/
lib/i18n.ts
page-components/
public/
styles/globals.css
```

## Notes on production hardening

The included in-memory rate limiter is intentionally simple for a portable foundation. In a horizontally scaled deployment, replace it with a shared store or platform-native rate limiting solution.

The site degrades gracefully when WebGL/advanced motion is absent because the primary hero visual is CSS-based rather than required for content. `prefers-reduced-motion` disables large motion and scroll-linked effects.

No fake customers, testimonials, awards, phone numbers, company-registration details or project metrics are included.

## Updating the logo
The supplied WeserCode logo is now the source asset used by the header and footer. Dark theme uses `public/brand/wesercode-logo-dark.png`; light theme uses `public/brand/wesercode-logo-light.png`. Replace those files with your final exported logo variants if needed. The mark/favicon is `public/brand/wesercode-mark.png`.

## Updating the team
Team profiles are defined in `data/team.ts`:

```ts
export const teamMembers = [
  { id: 'member-01', name: 'Your Name', role: 'Your Role', photo: '/team/your-name.jpg' },
];
```

Put the corresponding picture in `public/team/` and set the `photo` path. Add or remove profile objects only when verified team information is available.

## Background video

The site uses supplied theme-specific videos as a fixed, muted, looping background. Playback is disabled when reduced motion is requested. Light mode uses the supplied CloudFront MP4 and dark mode uses the supplied Mux HLS stream. Dark-mode fallback playback uses native HLS where the browser supports it and otherwise loads hls.js from jsDelivr at runtime.

The preparation sandbox could not resolve the external video hosts, so the binary video files are not embedded in this ZIP. The component automatically prefers local copies when present, and `scripts/download-background-videos.sh` downloads/converts the two sources in a networked environment.

## AI Readiness live scoring

The AI Readiness Check now keeps the score visible while the questionnaire is being answered. Every answer immediately updates the score, progress track and live recommendation list.

## Full-site background videos

The background video system is theme-aware and local-first. Put the supplied light video at `public/media/light-background.mp4` and a browser-compatible MP4 conversion of the supplied Mux HLS stream at `public/media/dark-background.mp4`. See `public/media/README.md` for the exact URLs and FFmpeg command, or run `scripts/download-background-videos.sh` on a networked machine with FFmpeg installed.

The site first tries these same-origin files and only falls back to the supplied remote sources when a local file is unavailable.

## STRATO deployment

For the current Next.js + Node.js architecture, see `STRATO-DEPLOYMENT.md`. It includes the STRATO server, SFTP, DNS, HTTPS, SMTP and production-service steps from zero to live deployment.

## Supplied visual banners

The current project includes the two supplied full-width page banners:

- `public/banners/ServiceBanner.png` → Services hero
- `public/banners/ProcessBanner.png` → Process hero

They are rendered as full-viewport visual hero sections before the existing detailed page content.

The About, FAQ and Contact page hero uses the local Bremen visual in `public/hero/wesercode-hero-city.webp`, avoiding a third-party image request.

## Latest refinement notes

- The navigation is now theme-aware and uses individual translucent glass link capsules for readability over light/dark content and visual banners.
- Services and Process banners remain at the top of the viewport behind the navigation; the navigation itself is a readable transparent/glass lens rather than an opaque bar.
- The team section shows the WeserCode team profiles defined in `data/team.ts`.
- The AI Readiness Check displays its live result as a percentage (0–100%) while the user answers.

## Homepage banner
The homepage now uses the supplied full-width image `public/banners/HomepageBanner.png` as the first-viewport hero. The text/action panel is intentionally top-positioned and size-limited so the primary CTA cannot be clipped by the following section.

### STRATO OS note (current)
STRATO's current V-Server Linux page lists Ubuntu 26.04 LTS and Ubuntu 24.04 LTS among supported operating systems. The deployment guide uses Ubuntu 24.04 LTS as the conservative choice for this project. ([STRATO Linux V-Server](https://www.strato.de/server/linux-vserver/))

### STRATO update releases
Use `scripts/deploy-strato-update.sh` for repeat deployments after the initial setup. It installs dependencies, builds the standalone Next.js runtime, refreshes static assets and restarts the `wesercode` systemd service.
