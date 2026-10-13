# WeserCode — Search & AI Discoverability Setup

This project includes the technical foundations recommended for discoverability in Bing, Google, and OpenAI-powered search experiences.

## Protected verification / analytics code

- Bing Webmaster verification is configured in `app/layout.tsx` as `msvalidate.01` with value `61B34006109DCCDE9896B7432C10588B`.
- Google Analytics measurement ID `G-5HK9RTXSSH` remains in `components/Analytics.tsx` and is still controlled by the existing consent implementation.

Do not remove either item during future redesigns.

## Included technical SEO improvements

- Canonical URLs and German/English hreflang alternatives, including `x-default`.
- Crawlable `robots.txt` with sitemap reference.
- Explicit `OAI-SearchBot` access for ChatGPT Search discovery.
- Public API routes excluded from generic crawling.
- XML sitemap with canonical German/English URLs and freshness hints.
- Organization / ProfessionalService / WebSite JSON-LD structured data.
- Open Graph and Twitter/X preview metadata.
- Index/follow directives and large image/snippet permissions for Googlebot.
- Improved favicon metadata.
- `llms.txt` as an additional machine-readable overview (helpful convention, not a ranking guarantee or official requirement of Google/Bing/OpenAI).
- IndexNow key file and `npm run indexnow` submission script for Bing and other IndexNow participants.

## After deploying to production

1. Open `https://www.wesercode.de/robots.txt` and confirm it loads.
2. Open `https://www.wesercode.de/sitemap.xml` and confirm all public German/English URLs are present.
3. View the homepage HTML source and confirm `msvalidate.01` contains `61B34006109DCCDE9896B7432C10588B`.
4. Verify the site in Bing Webmaster Tools and submit `https://www.wesercode.de/sitemap.xml`.
5. In Google Search Console, submit the same sitemap and inspect the homepage, Services, About, and Contact URLs.
6. Run `npm run indexnow` from the deployed project after important public pages are added, changed, or removed.
7. Validate JSON-LD with Google Rich Results Test / Schema.org validator after production deployment.
8. Keep adding useful, original content that demonstrates real expertise: detailed service pages, case studies, project outcomes, FAQs based on real client questions, and clear About/contact information.
9. Earn genuine links/citations from clients, business profiles, directories, partners, and relevant local/industry sources; do not buy links or use link schemes.

## Important

Technical SEO makes the site crawlable and understandable, but no implementation can guarantee ranking or inclusion in AI answers. Search engines also evaluate content quality, relevance, authority, reputation, user experience, and external signals.


## Open Graph, 404, and robots updates

- Dedicated social preview image: `/og-wesercode.jpg` (1200 × 630). Root and homepage metadata point to this image for Open Graph and X/Twitter previews.
- Custom German 404 page: `app/not-found.tsx`; English 404 page: `app/en/not-found.tsx`. Both use existing WeserCode navigation, footer, theme variables, and background.
- `app/robots.ts` generates `/robots.txt` and allows normal search crawling plus OAI-SearchBot and GPTBot, while disallowing `/api/`. It references the canonical sitemap URL.
- After deployment, check `/og-wesercode.jpg`, `/robots.txt`, and a deliberately invalid URL such as `/this-page-does-not-exist`. Social preview caches may take time to refresh.
