const CACHE='librarium-v3';
const ASSETS=['./','./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png','./data/books.json'];
self.addEventListener('install',e=>{
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)));
  self.skipWaiting();
});
self.addEventListener('activate',e=>{
  e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))));
  self.clients.claim();
});
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET'||e.request.url.includes('api.anthropic.com'))return;
  e.respondWith(
    caches.match(e.request).then(r=>r||fetch(e.request).then(resp=>{
      if(e.request.url.startsWith(self.location.origin)){
        const clone=resp.clone();
        caches.open(CACHE).then(c=>c.put(e.request,clone));
      }
      return resp;
    }).catch(()=>caches.match('./index.html')))
  );
});
