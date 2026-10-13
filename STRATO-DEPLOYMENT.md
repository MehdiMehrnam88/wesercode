# WeserCode on STRATO — 0 to 100 deployment guide

This project is a Next.js application with a real `/api/contact` endpoint. The exact project therefore needs a server environment that can run Node.js. STRATO states that its classic shared Webhosting packages are PHP-oriented and do not provide the root access required to run Node.js applications. For this exact project, use a STRATO Linux V-Server/VPS, Dedicated Server or another STRATO server product with administrator/root access.

Official STRATO references:
- Node.js on STRATO servers: https://www.strato.de/server/node-js-hosting/
- SSH login on Linux servers: https://www.strato.de/faq/server/mit-putty-an-linux-server-und-managed-server-anmelden/
- SFTP/SSH access: https://www.strato.de/faq/hosting/so-nutzen-sie-ihren-ssh-sftp-zugang/
- DNS management: https://www.strato.de/hosting/dns-server/
- SSL: https://www.strato.de/faq/domains/wie-kann-ich-mein-kostenfreies-strato-ssl-zertifikat-verwenden/

## 0. What to select in STRATO

When the new server appears in the STRATO customer login, use a plain Linux installation rather than a Plesk image for this deployment path. STRATO currently lists Ubuntu 26.04 LTS and Ubuntu 24.04 LTS for Linux V-Servers. This guide uses Ubuntu 24.04 LTS. If your server is already provisioned with Ubuntu 26.04 LTS, keep it; the application does not require a reinstall.

The current STRATO VPS/VDS setup distinguishes newer VC/VDS classes from older V/PA-S classes. The login path and whether an OS is preinstalled can therefore differ by product class. STRATO documents the initial setup here: https://www.strato.de/faq/server/die-ersten-schritte-mit-ihrem-linux-vps-vds/

## A0. Recommended workflow for this website

Use the supplied ZIP as the development source package on your Windows PC. Do not upload `node_modules`, `.next`, `.env.local` or `.env.production` from your PC. Build locally for development, then upload the ZIP to STRATO and build there on Linux.

For this small server, the production filesystem is intentionally kept minimal after each release:

```text
/var/www/wesercode/
├── .env.production              # KEEP THIS FILE
└── .next/standalone/             # only the running Next.js runtime
```

The included `scripts/deploy-strato-update.sh` performs the staged deployment and cleanup. It refuses to run when `/var/www/wesercode/.env.production` is missing, copies that file only temporarily into the build directory, and deletes the temporary build/source data after a successful release.

## A1. Local development on Windows

After extracting the ZIP on your PC:

```powershell
cd .\wesercode-site
copy .env.example .env.local
npm install
npm run dev
```

Open `http://localhost:3000`. For a local production check, stop the dev server and run:

```powershell
npm run build
npm start
```

Do not copy your `.env.local` into the STRATO deployment archive. Keep production mail credentials only in `/var/www/wesercode/.env.production` on the server.

## A. Before you start

You need:

1. Your STRATO domain, for example `wesercode.de`.
2. A STRATO Linux V-Server/VPS, Dedicated Server, or another Node-capable STRATO server.
3. SSH access to that server.
4. The local WeserCode project folder from this ZIP.
5. The background videos in:
   - `public/media/light-background.mp4`
   - `public/media/dark-background.mp4`
6. A STRATO mailbox for `hello@wesercode.de`.

The website can run without the videos, but the intended background effect requires those two files.

## B. Prepare the email mailbox

Create or verify the `hello@wesercode.de` mailbox in your STRATO customer area.

For current STRATO mail settings, the SMTP server is `smtp.strato.de`, port `465`, using SSL/TLS and the full email address as the username. See STRATO's current mail-server documentation: https://www.strato.de/faq/mail/e-mailserver-adressen-ports-ssl-tls/

Create `.env.production` on the server (never commit it to Git):

```env
NEXT_PUBLIC_SITE_URL=https://www.wesercode.de
CONTACT_TO=hello@wesercode.de
EMAIL_PROVIDER=smtp
SMTP_HOST=smtp.strato.de
SMTP_PORT=465
SMTP_USER=hello@wesercode.de
SMTP_PASS=YOUR_STRATO_EMAIL_PASSWORD
SMTP_FROM=hello@wesercode.de
```

Do not paste your password into the source code.

## C. Prepare the STRATO server

1. Log in to STRATO.
2. Open your server's management area and find the server hostname/IP under the server details.
3. Install a current Ubuntu LTS image. STRATO currently lists Ubuntu 26.04 LTS and Ubuntu 24.04 LTS for its V-Server Linux offering. For this project I recommend Ubuntu 24.04 LTS as the conservative compatibility choice; if you already provisioned Ubuntu 26.04 LTS, you do not need to reinstall solely for the website. STRATO's current OS list is here: https://www.strato.de/faq/server/welche-betriebssysteme-stehen-fuer-server-zur-verfuegung/
4. Connect using SSH. STRATO documents Linux SSH access and server hostnames here: https://www.strato.de/faq/server/mit-putty-an-linux-server-und-managed-server-anmelden/
5. Update packages:

```bash
sudo apt update
sudo apt upgrade -y
```

6. Install the basic tools:

```bash
sudo apt install -y nginx unzip git curl build-essential
```

7. Install Node.js 22 LTS. The current Node.js release schedule lists v22 as LTS, and Next.js 16 requires Node.js 20.9 or newer. Node 22 therefore provides a supported LTS baseline for this project.

Example:

```bash
curl -fsSL https://deb.nodesource.com/setup_22.x | bash -
apt install -y nodejs
node -v
npm -v
```

## D. Create the app user and folder

Run as root or with sudo:

```bash
sudo useradd --system --create-home --shell /bin/bash wesercode
sudo mkdir -p /var/www/wesercode
sudo chown -R wesercode:wesercode /var/www/wesercode
```

STRATO recommends securing SSH access on Linux servers by creating a separate user, then disabling direct root login and using public-key authentication where appropriate: https://www.strato.de/faq/server/wie-kann-ich-den-ssh-dienst-auf-meinem-linux-server-absichern/

## E. Upload the project

There are two simple options.

### Option 1 — SFTP with FileZilla

STRATO recommends SFTP rather than plain FTP. Their current SFTP documentation is here: https://www.strato.de/faq/hosting/so-nutzen-sie-ihren-ssh-sftp-zugang/

Use:
- Protocol: SFTP
- Host: the server hostname shown by STRATO
- Port: 22
- User: your STRATO SSH user
- Password/key: your SSH credential

Upload the project into:

```text
/var/www/wesercode
```

### Option 2 — SCP

From Windows PowerShell with OpenSSH installed, you can also use:

```powershell
scp -r .\wesercode-site\* USER@SERVER:/var/www/wesercode/
```

## F0. Publishing a new release without losing `.env.production`

This is the preferred update procedure for the current STRATO server. It keeps the production environment file and avoids filling the small disk with duplicate source trees and build artifacts.

### 1. Upload the new ZIP to `/tmp`

Using SFTP, upload the one ZIP from this project as:

```text
/tmp/wesercode-site.zip
```

Do not upload `.env.production` from the PC.

### 2. SSH into the server and verify the environment file

```bash
ls -l /var/www/wesercode/.env.production
sudo chmod 600 /var/www/wesercode/.env.production
```

If that file is missing, stop. Do not continue until the existing STRATO environment file is restored.

### 3. Extract the one ZIP into `/tmp` and run the included deployment script

```bash
rm -rf /tmp/wesercode-incoming
mkdir -p /tmp/wesercode-incoming
unzip -q /tmp/wesercode-site.zip -d /tmp/wesercode-incoming
sudo bash /tmp/wesercode-incoming/wesercode-site/scripts/deploy-strato-update.sh /tmp/wesercode-site.zip
```

Everything needed for this procedure is inside the single ZIP. No second deployment file is required.

The script then:

1. extracts the new source into `/tmp`;
2. copies the existing `.env.production` temporarily without changing the original;
3. runs `npm ci` and `npm run build`;
4. prepares the standalone runtime with `public/` and `.next/static`;
5. briefly stops the service and replaces only `.next/standalone`;
6. starts the service again;
7. removes uploaded source files, `node_modules` and unnecessary build data;
8. removes the uploaded ZIP and extracted source tree;
9. leaves `/var/www/wesercode/.env.production` untouched.

### 4. Verify the live service

```bash
sudo systemctl is-active wesercode
sudo nginx -t
curl -I https://www.wesercode.de
```

Then test `/`, `/about`, `/services`, `/process`, `/faq`, `/contact`, the English routes, both themes and the contact form.

### 5. If the service does not start

```bash
sudo journalctl -u wesercode -n 100 --no-pager
```

The first thing to check is that `/var/www/wesercode/.env.production` still exists and that `.next/standalone/server.js` exists.

## F. Install dependencies and build

SSH into the server and run:

```bash
cd /var/www/wesercode
npm install
npm run build
```

The project is configured with `output: 'standalone'`, so Next.js creates a self-contained runtime under:

```text
.next/standalone
```

After the build, copy the static assets into that runtime:

```bash
rm -rf .next/standalone/public .next/standalone/.next/static
cp -R public .next/standalone/public
cp -R .next/static .next/standalone/.next/static
```

You can also run all of this with:

```bash
bash scripts/prepare-strato-standalone.sh
```

## G. Install the production environment file

Create:

```text
/var/www/wesercode/.env.production
```

using the SMTP values from section B.

Make it readable only by the deployment/admin account where possible:

```bash
sudo chmod 600 /var/www/wesercode/.env.production
```

## H. Run the Next.js application with systemd

Copy the included service file:

```bash
sudo cp deploy/strato/wesercode.service /etc/systemd/system/wesercode.service
```

Then:

```bash
sudo systemctl daemon-reload
sudo systemctl enable wesercode
sudo systemctl start wesercode
sudo systemctl status wesercode
```

Check the application locally on the server:

```bash
curl -I http://127.0.0.1:3000
```

You should receive an HTTP response from Next.js.

## I. Configure the domain DNS in STRATO

In the STRATO customer area, open the DNS settings for the domain and point the domain to the server's public IP address using the appropriate A/AAAA records.

STRATO documents self-managed A, AAAA, CNAME, MX and other DNS records here:
https://www.strato.de/hosting/dns-server/

Typical setup:

```text
wesercode.de      A       YOUR_SERVER_IPV4
www.wesercode.de  A       YOUR_SERVER_IPV4
```

If you also use IPv6, add the matching AAAA record only when IPv6 is correctly configured on the server.

DNS changes may take some time to propagate.

## J. Configure Nginx

Copy the included config:

```bash
sudo cp deploy/strato/nginx-wesercode.conf /etc/nginx/sites-available/wesercode
sudo ln -s /etc/nginx/sites-available/wesercode /etc/nginx/sites-enabled/wesercode
sudo nginx -t
sudo systemctl reload nginx
```

At this stage HTTP should proxy to the Next.js app.

## K. HTTPS / SSL

For STRATO-managed hosting/domain products, STRATO provides SSL management in the customer login. For a self-managed server, choose one certificate strategy and configure it consistently. STRATO's SSL documentation explains certificate assignment and the differences for self-managed servers: https://www.strato.de/faq/domains/so-nutzen-sie-strato-ssl/

For a self-managed Linux server, you can use a normal ACME/Let's Encrypt setup (for example Certbot with Nginx) or install a STRATO-provided certificate according to the server product you purchased.

Do not put the site live with HSTS preload until HTTPS is fully working on both `wesercode.de` and `www.wesercode.de`.

## L. Background videos

Place these files on the server:

```text
/var/www/wesercode/public/media/light-background.mp4
/var/www/wesercode/public/media/dark-background.mp4
```

Then rebuild and restart:

```bash
cd /var/www/wesercode
npm run build
rm -rf .next/standalone/public .next/standalone/.next/static
cp -R public .next/standalone/public
cp -R .next/static .next/standalone/.next/static
sudo systemctl restart wesercode
```

The browser chooses the light or dark video automatically with the active theme.

## M. Test the contact form

1. Open `https://www.wesercode.de/contact`.
2. Fill Name, Email and a Message with at least 20 characters.
3. Tick the privacy-consent checkbox.
4. Click the submit button.
5. Confirm the message appears in `hello@wesercode.de`.
6. Check the server logs if delivery fails:

```bash
sudo journalctl -u wesercode -n 100 --no-pager
```

Also test a deliberately invalid email and a short message to confirm server-side validation.

## N. Basic production checks

```bash
sudo nginx -t
sudo systemctl is-active nginx
sudo systemctl is-active wesercode
curl -I https://www.wesercode.de
```

Then test:

- Home
- Services
- Process
- About
- FAQ
- Contact
- Impressum
- Datenschutz
- `/en/` and the English routes
- dark/light theme
- DE/EN switching
- background video in both themes
- mobile layout
- contact email delivery
- Google Maps location
- sitemap: `/sitemap.xml`
- robots: `/robots.txt`

## O. If you only have STRATO shared Webhosting

Do not upload this exact Next.js server project and expect `/api/contact` to run. STRATO explicitly states that classic shared Webhosting packages do not support Node.js server applications.

In that case there are two routes:

1. Use a STRATO V-Server/VPS/server product and keep the current architecture.
2. Convert the website to a static export and replace the Node contact endpoint with a compatible PHP/external mail endpoint.

The current ZIP is prepared for option 1 because it preserves the real Next.js backend and contact endpoint.

## Current official references

- STRATO Linux V-Server: https://www.strato.de/server/linux-vserver/
- STRATO VPS/VDS first steps: https://www.strato.de/faq/server/die-ersten-schritte-mit-ihrem-linux-vps-vds/
- STRATO SSH/SFTP: https://www.strato.de/faq/hosting/so-nutzen-sie-ihren-ssh-sftp-zugang/
- STRATO DNS records: https://www.strato.de/faq/domains/wie-kann-ich-bei-strato-meine-dns-eintraege-verwalten/
- STRATO SSL / Let's Encrypt: https://www.strato.de/faq/server/lets-encrypt-auf-server-einrichten-anleitung-fuer-kostenlose-ssl-zertifikate/
- STRATO SMTP: https://www.strato.de/faq/mail/e-mailserver-adressen-ports-ssl-tls/
- Next.js 16 requirements: https://nextjs.org/docs/app/getting-started/installation
- Node.js release schedule: https://nodejs.org/en/about/previous-releases
