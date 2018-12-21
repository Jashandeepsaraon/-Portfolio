const staticCache = "my-cache-1";


self.addEventListener('activate', function(event) {
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.filter(function(cacheName) {
                    return cacheName.startsWith("my-") && cacheName !== staticCache
                }).map(function(cacheName) {
                    return caches.delete(cacheName);
                })
            );
        })
    );
});
 
self.addEventListener("install", function(event) {
    event.waitUntil(
        caches.open(staticCache).then(function(cache) {
            return cache.addAll(
                [
                    "./images/1024px-Logo_Paris_Transilien_ligneJ.svg.png",
                    "./images/1.jpg",
                    "./images/sharing-content-on-facebook.png",
                    "./images/whatsapp-logo.jpg",
                    "./images/Instagram.png",
                    "./js/app.js",
                    "./style.css",
                    "/",
                    "/index.html"
                ]
            )
        })
    )
})

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(function(response) {
            return response || fetch(event.request)
        })
    )
});

 