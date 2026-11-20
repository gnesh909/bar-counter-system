/* Lets the app open with no internet. Bump VERSION whenever index.html changes. */
const VERSION = "bcs-v1";
const SHELL = ["./", "./index.html", "./manifest.webmanifest", "./icon-192.png", "./icon-512.png"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  /* Try the network first so updates arrive; fall back to the saved copy when offline. */
  e.respondWith(
    fetch(req).then(res => {
      if (res.ok && (new URL(req.url).origin === location.origin || /fonts\.(googleapis|gstatic)\.com$/.test(new URL(req.url).hostname))) {
        const copy = res.clone();
        caches.open(VERSION).then(c => c.put(req, copy));
      }
      return res;
    }).catch(() => caches.match(req, {ignoreSearch: true}).then(r => r || caches.match("./index.html")))
  );
});
