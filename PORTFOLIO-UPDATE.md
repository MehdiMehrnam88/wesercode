# WeserCode portfolio update

The About page now contains a new **Selected client projects / Ausgewählte Kundenprojekte** section between History and Team.

Included projects:
- https://msg-solution.de/
- https://volt-script.de/
- http://novef.com/

Each project has:
- a local, lightweight browser-style preview graphic;
- project type and focus tags in German and English;
- a direct link to the live website;
- responsive glassmorphism styling matching the existing WeserCode site.

No existing SEO, verification, analytics, metadata, navigation, legal pages, contact logic, theme logic or deployment configuration was intentionally changed.

## Deployment

Install dependencies on the target Linux server and rebuild the Next.js standalone output after uploading the updated source:

```bash
npm install
npm run build
```

The returned source package intentionally excludes `node_modules/`, `.next/` and `.env.local` because they are environment-specific/generated or contain local credentials. Keep the production environment file on the server.
