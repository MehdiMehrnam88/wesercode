# WeserCode — local development and low-disk STRATO release workflow

## Local

1. Extract this ZIP.
2. `cd wesercode-site`
3. Copy `.env.example` to `.env.local`.
4. Add local email settings when you want to test the contact endpoint.
5. `npm install`
6. `npm run dev`
7. Open `http://localhost:3000`.
8. Before publishing, run `npm run build`.

## STRATO

Upload this ZIP to `/tmp/wesercode-site.zip`. Keep the existing `/var/www/wesercode/.env.production` on the server. Never replace it with the local env file.

The release script builds in `/tmp`, copies the existing env file only for the build, replaces `.next/standalone`, and then removes the temporary source tree, `node_modules`, uploaded ZIP and unnecessary `.next` data. The final production directory keeps only `.env.production` and `.next/standalone`.

Run:

```bash
sudo bash /tmp/deploy-strato-update.sh /tmp/wesercode-site.zip
```
