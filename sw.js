// BEAST MODE 4D v4.33 offline shell. Keep local data and prediction code untouched.
const CACHE='beast-4d-v433-shell';
const SHELL=['./','./index.html','./manifest.json','./icon-192.png','./icon-512.png',
 './festive-engine-v432.css?v=433','./festive-engine-v432.js?v=433'];
self.addEventListener('install',event=>{
 event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(SHELL)).then(()=>self.skipWaiting()));
});
self.addEventListener('activate',event=>{
 event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('beast-4d-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));
});
self.addEventListener('fetch',event=>{
 const request=event.request,url=new URL(request.url);
 if(request.method!=='GET'||url.origin!==self.location.origin)return;
 event.respondWith(fetch(request).then(resp=>{
  if(resp.ok&&/\/(index\.html|manifest\.json|icon-192\.png|icon-512\.png|festive-engine-v432\.(js|css))$/.test(url.pathname)){
   const copy=resp.clone();caches.open(CACHE).then(c=>c.put(request,copy)).catch(()=>{});
  }
  return resp;
 }).catch(()=>caches.match(request)));
});