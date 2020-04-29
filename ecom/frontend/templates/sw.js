const staticCacheName = "site-static-v23";
const dynamicCacheName = "site-dynamic-v23";
const assets = [
  "/static/frontend/main.js",
  "/fallback/",
  "https://use.fontawesome.com/releases/v5.7.2/webfonts/fa-solid-900.woff2",
  "https://use.fontawesome.com/releases/v5.7.2/webfonts/fa-brands-400.woff2",
  "https://bookshop-images-f1492f08-f236-4a55-afb7-70ded209cb24.s3.eu-west-2.amazonaws.com/resources/noresults.png",
  "https://bootswatch.com/4/cosmo/bootstrap.min.css",
  "https://bookshop-images-f1492f08-f236-4a55-afb7-70ded209cb24.s3.eu-west-2.amazonaws.com/resources/logo-petite-portugaise-300.png",
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(staticCacheName).then((cache) => {
      cache.addAll(assets);
    })
  );
});

const limitCacheSize = (cacheName, size) => {
  caches.open(cacheName).then((cache) => {
    cache.keys().then((keys) => {
      if (keys.length > size) {
        cache.delete(keys[0]).then(limitCacheSize(cacheName, size));
      }
    });
  });
};

addEventListener("fetch", (event) => {
  // Prevent the default, and handle the request ourselves.
  // Ignore non-GET requests
  // if (req.method !== "GET") {
  //   return;
  // }
  // // Ignore images
  // if (req.headers.get("Accept").indexOf("image") === 0) {
  //   return;
  // }
  // if (request.headers.get('Accept').indexOf('image') !== -1)
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Réponse du cache, ou undefined si elle n'est pas dans le cache
      // Si la ressource de la requête est dans le cache, on la renvoie tout simplement,
      // sinon, on lance manuellement une requête réseau, qui elle, peut foirer si on est en offline... d'où le catch
      return (
        response ||
        fetch(event.request)
          .then((responseFetch) => {
            caches
              .open(dynamicCacheName)
              .then((cache) => cache.put(event.request, responseFetch));

            return responseFetch.clone();
            // return response;
          })
          .catch(() => caches.match("fallback/"))
      );
    })
  );
});

// fires when we activate a new service worker
self.addEventListener("activate", (e) => {
  // waitUntil expects one promise back
  e.waitUntil(
    caches.keys().then((keys) => {
      // when all resolve return one promise
      Promise.all(
        keys
          .filter((key) => key !== staticCacheName && key !== dynamicCacheName)
          .map((key) => caches.delete(key))
      );
    })
  );
});
