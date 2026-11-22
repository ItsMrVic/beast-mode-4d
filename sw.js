// BEAST MODE 4D v4.41 AI Brain offline shell. Keep local data and prediction code untouched.
const CACHE='beast-4d-v441-ai-brain';
const SHELL=['./','./index.html','./manifest.json','./icon-192.png','./icon-512.png',
 './festive-engine-v432.css?v=436','./festive-engine-v432.js?v=436','./live-api-v436.js?v=436','./cultural-theme.js','./coverage-mode.html','./ibox-715.html','./ai-brain.html','./ibox-hot-archive-v440.js?v=440','./data/verified-results.json'];
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
  if(resp.ok&&/\/(index\.html|manifest\.json|icon-192\.png|icon-512\.png|festive-engine-v432\.(js|css)|live-api-v436\.js|coverage-mode\.html|coverage-sets-v438\.js|ibox-715\.html|ai-brain\.html|ibox-hot-archive-v440\.js|verified-results\.json|cultural-theme\.js)$/.test(url.pathname)){
   const copy=resp.clone();caches.open(CACHE).then(c=>c.put(request,copy)).catch(()=>{});
  }
  return resp;
 }).catch(()=>caches.match(request)));
});