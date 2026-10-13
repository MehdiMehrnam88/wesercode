const key = 'e43fcd24ab70e9353edc20fb13c4251e';
const host = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.wesercode.de').replace(/\/$/, '');
const routes = ['', 'services', 'process', 'about', 'faq', 'contact'];
const urlList = routes.flatMap((route) => [
  `${host}${route ? `/${route}` : '/'}`,
  `${host}/en${route ? `/${route}` : ''}`,
]);

const response = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'content-type': 'application/json; charset=utf-8' },
  body: JSON.stringify({
    host: new URL(host).host,
    key,
    keyLocation: `${host}/${key}.txt`,
    urlList,
  }),
});

if (!response.ok && response.status !== 202) {
  const body = await response.text();
  throw new Error(`IndexNow submission failed: ${response.status} ${body}`);
}

console.log(`IndexNow accepted ${urlList.length} URLs (HTTP ${response.status}).`);
