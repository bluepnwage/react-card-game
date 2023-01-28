async function addToCache(resources) {
  const cache = await caches.open("v1");
  await cache.addAll(resources);
}
self.addEventListener("install", async (event) => {
  event.waitUntil(addToCache(["/index.html"]));
});

async function putInCache(request, response) {
  const cache = await caches.open("v1");
  await cache.put(request, response);
}

async function cacheFirst(request) {
  if (request.url.includes("chrome-extension")) {
    return fetch(request);
  }

  const cache = await caches.match(request);
  if (cache) {
    return cache;
  }
  const response = await fetch(request);
  putInCache(request, response.clone());
  return response;
}

self.addEventListener("fetch", async (event) => {
  event.respondWith(cacheFirst(event.request));
});
