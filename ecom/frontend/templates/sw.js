// fetch event
self.addEventListener("fetch", (e) => {
  console.log(e);
});

// install service worker
self.addEventListener("install", (e) => {
  console.log(e);
});

// activate service worker
self.addEventListener("activate", (e) => {
  console.log(e);
});
