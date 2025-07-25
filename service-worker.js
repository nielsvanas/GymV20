const CACHE_NAME = "gymv20-cache-v1";
const FILES=["/","index.html","entries.html","body.html","main.js","entries.js","body.js","manifest.json","baki.png","baki_icon.png","https://fonts.googleapis.com/css2?family=Metal+Mania&display=swap","prEntry.html","prLog.html","prEntry.js","prLog.js"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(CACHE_NAME).then(c=>c.addAll(FILES)));self.skipWaiting();});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.map(k=>k!==CACHE_NAME&&caches.delete(k)))));self.clients.claim();});
self.addEventListener("fetch",e=>{e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)));});
