const staticCacheName = "site-static";
const dynamicCacheName = "site-dynamic";
const assets = [
  "/static/frontend/main.js",
  "/fallback/",
  "https://use.fontawesome.com/releases/v5.7.2/webfonts/fa-solid-900.woff2",
  "https://use.fontawesome.com/releases/v5.7.2/webfonts/fa-brands-400.woff2",
  "https://bookshop-images-f1492f08-f236-4a55-afb7-70ded209cb24.s3.eu-west-2.amazonaws.com/resources/noresults.png",
  "https://bootswatch.com/4/cosmo/bootstrap.min.css",
  //   "https://js.stripe.com/v3/",
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

self.addEventListener("fetch", (e) => {
  // pause the event and respond with our custom event
  // check if url is in the pre cache
  //   e.respondWith(caches.match(e.request)).then((cacheRes) => {
  //     return (
  //       cacheRes ||
  //       fetch(e.request)
  //         // .then((fetchRes) => {
  //         //   return caches.open(dynamicCacheName).then((cache) => {
  //         //     cache.put(e.request.url, fetchRes.clone());
  //         //     limitCacheSize(dynamicCacheName, 15);
  //         //     return fetchRes;
  //         //   });
  //         // })
  //         .catch(() => {
  //           // checks the position of the .html
  //           // in the request url if it doesnt find returns -1
  //           if (e.request.url.indexOf(".html") > -1) {
  //             return caches.match("/fallback");
  //           }
  //         })
  //     );
  //   });
});

// fires when we activate a new service worker
self.addEventListener("activate", (e) => {
  console.log("delete cache on activate" + e);
  // waitUntil epects one promise back
  e.waitUntil(
    caches.keys().then((keys) => {
      console.log(keys);
      // when all resolve return one promise
      Promise.all(
        keys
          .filter((key) => key !== staticCacheName && key !== dynamicCacheName)
          .map((key) => caches.delete())
      );
    })
  );
});
