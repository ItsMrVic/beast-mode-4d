// Beast Mode 4D v4.21 - cache local application shell only.
const CACHE='beast-4d-v421-shell';
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(['./','./index.html','./manifest.json','./icon-192.png','./icon-512.png'])).then(()=>self.skipWaiting())));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('beast-4d-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',event=>{const url=new URL(event.request.url);if(url.origin!==self.location.origin||event.request.method!=='GET')return;event.respondWith(fetch(event.request).then(resp=>{if(resp.ok&&url.pathname.match(/\/(index\.html|manifest\.json|icon-192\.png|icon-512\.png)$/)){const cp=resp.clone();caches.open(CACHE).then(c=>c.put(event.request,cp));}return resp;}).catch(()=>caches.match(event.request)));});
