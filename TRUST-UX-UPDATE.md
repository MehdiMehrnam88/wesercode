# WeserCode — Trust & Low-Barrier UX Update

This update changes the site from a primarily technology-led explanation into a lower-barrier conversation-led experience.

## Main idea
Visitors do not need to arrive with a finished project brief, technical vocabulary, a chosen service, or a complete understanding of IT. The site now repeatedly communicates that a problem, idea, question, screenshot, link, or rough thought is enough to start.

## Changes

- Header CTA changed from "Projekt starten / Start a project" to "Kurz sprechen / Let’s talk".
- Homepage hero now addresses uncertainty directly and explains that visitors do not need to know which technology they need.
- New conversation bridge on the homepage with three simple stages: describe, clarify, move forward.
- Low-barrier reassurance blocks added to Services, Process, About, FAQ and Contact.
- About page now explicitly explains what a visitor does and does not need to bring to the conversation.
- FAQ starts with questions such as whether someone can contact WeserCode without knowing what they need or understanding IT.
- Contact page copy is more conversational and less like a formal project tender.
- Contact form now offers a "not sure yet" project type and example messages people can copy/adapt.
- Contact message minimum reduced from 20 to 10 characters so a very short first message is accepted more easily.
- Final homepage CTA now offers both the contact flow and direct email.
- German and English copy are updated consistently.

## Protected technical configuration

The following existing technical files were intentionally left unchanged:

- `app/layout.tsx`
- `next.config.ts`
- `components/Analytics.tsx`
- `app/sitemap.ts`
- `app/robots.ts`

In particular, the existing Bing Webmaster verification meta tag and Google consent/analytics logic remain untouched.

## Validation

- TypeScript: `npx tsc --noEmit` passes.
- A new `next build` could not be completed in the sandbox because the Linux SWC binary is missing and the environment could not resolve `registry.npmjs.org`. This is an environment/network limitation.

## Contact detail note

No phone number was present in the project source, so no phone number was invented or added. The site instead makes direct email and low-friction contact the visible path.
