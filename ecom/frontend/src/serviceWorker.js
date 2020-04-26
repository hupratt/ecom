// In production, we register a service worker to serve assets from local cache.

// This lets the app load faster on subsequent visits in production, and gives
// it offline capabilities. However, it also means that developers (and users)
// will only see deployed updates on the "N+1" visit to a page, since previously
// cached resources are updated in the background.

// To learn more about the benefits of this model, read https://goo.gl/KwvDNy.
// This link also includes instructions on opting out of this behavior.

const isLocalhost = Boolean(
  window.location.hostname === "localhost" ||
    // 127.0.0.1/8 is considered localhost for IPv4.
    window.location.hostname.match(
      /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
);

const staticCacheName = "site-static";
const dynamicCacheName = "site-dynamic";
const assets = [
  "/",
  "https://bootswatch.com/4/cosmo/bootstrap.min.css",
  "https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,700&display=swap",
  "https://fonts.googleapis.com/css?family=Lato:400,700,400italic,700italic&subset=latin",
  "https://code.jquery.com/jquery-3.3.1.slim.min.js",
  "/fallback",
];

const limitCacheSize = (cacheName, size) => {
  caches.open(cacheName).then((cache) => {
    cache.keys().then((keys) => {
      if (keys.length > size) {
        cache.delete(keys[0]).then(limitCacheSize(cacheName, size));
      }
    });
  });
};

window.addEventListener("fetch", (e) => {
  console.log("fetching" + e);
  // pause the event and respond with our custom event
  // check if url is in the pre cache
  e.respondWith(e.request).then((cacheRes) => {
    return (
      cacheRes ||
      fetch(e.request)
        .then((fetchRes) => {
          return caches.open(dynamicCacheName).then((cache) => {
            cache.put(e.request.url, fetchRes.clone());
            limitCacheSize(dynamicCacheName, 15);
            return fetchRes;
          });
        })
        .catch(() => {
          // checks the position of the .html
          // in the request url if it doesnt find returns -1
          if (e.request.url.indexOf(".html") > -1) {
            return caches.match("/fallback");
          }
        })
    );
  });
});

window.addEventListener("install", (e) => {
  console.log("caching" + e);
  e.waitUntil(
    caches.open(staticCacheName).then((cache) => {
      cache.addAll(assets);
    })
  );
});

// fires when we activate a new service worker
window.addEventListener("activate", (e) => {
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

export default function register() {
  // checks the env variable and whether the browser supports service workers
  if ("serviceWorker" in navigator) {
    // The URL constructor is available in all browsers that support SW.
    const publicUrl = new URL(process.env.REACT_APP_BASE, window.location);
    if (publicUrl.origin !== window.location.origin) {
      // Our service worker won't work if REACT_APP_BASE is on a different origin
      // from what our page is served on. This might happen if a CDN is used to
      // serve assets; see https://github.com/facebookincubator/create-react-app/issues/2374
      return;
    }

    window.addEventListener("load", () => {
      const swUrl = `${process.env.REACT_APP_BASE}/static/sw.js`;

      if (isLocalhost) {
        // This is running on localhost. Lets check if a service worker still exists or not.
        checkValidServiceWorker(swUrl);

        // Add some additional logging to localhost, pointing developers to the
        // service worker/PWA documentation.
        navigator.serviceWorker.ready.then(() => {
          console.log(
            "This web app is being served cache-first by a service " +
              "worker. To learn more, visit https://goo.gl/SC7cgQ"
          );
        });
      } else {
        // Is not local host. Just register service worker
        registerValidSW(swUrl);
      }
    });
  }
}

function registerValidSW(swUrl) {
  navigator.serviceWorker
    .register(swUrl)
    .then((registration) => {
      console.log(registration);
      registration.onupdatefound = () => {
        const installingWorker = registration.installing;
        installingWorker.onstatechange = () => {
          if (installingWorker.state === "installed") {
            if (navigator.serviceWorker.controller) {
              // At this point, the old content will have been purged and
              // the fresh content will have been added to the cache.
              // It's the perfect time to display a "New content is
              // available; please refresh." message in your web app.
              console.log("New content is available; please refresh.");
            } else {
              // At this point, everything has been precached.
              // It's the perfect time to display a
              // "Content is cached for offline use." message.
              console.log("Content is cached for offline use.");
            }
          }
        };
      };
    })
    .catch((error) => {
      console.error("Error during service worker registration:", error);
    });
}

function checkValidServiceWorker(swUrl) {
  // Check if the service worker can be found. If it can't reload the page.
  fetch(swUrl)
    .then((response) => {
      // Ensure service worker exists, and that we really are getting a JS file.
      if (
        response.status === 404 ||
        response.headers.get("content-type").indexOf("javascript") === -1
      ) {
        // No service worker found. Probably a different app. Reload the page.
        navigator.serviceWorker.ready.then((registration) => {
          registration.unregister().then(() => {
            window.location.reload();
          });
        });
        console.log("Nok.");
      } else {
        // Service worker found. Proceed as normal.
        registerValidSW(swUrl);
        console.log("Ok.");
      }
    })
    .catch(() => {
      console.log(
        "No internet connection found. App is running in offline mode."
      );
    });
}

export function unregister() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.ready.then((registration) => {
      registration.unregister();
    });
  }
}
