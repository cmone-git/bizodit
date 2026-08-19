const CACHE_NAME = "bizodit-v1";

const CORE_FILES = [
    "./",
    "./index.html",
    "./splash.html",
    "./loading.html",
    "./manifest.json",
    "./css/app.css",
    "./js/app.js",
    "./js/icons.js"
];


/* INSTALL */

self.addEventListener("install", event => {

    event.waitUntil(

        caches.open(CACHE_NAME)

            .then(cache => {

                return cache.addAll(CORE_FILES);

            })

            .then(() => {

                return self.skipWaiting();

            })

    );

});


/* ACTIVATE */

self.addEventListener("activate", event => {

    event.waitUntil(

        caches.keys()

            .then(keys => {

                return Promise.all(

                    keys

                        .filter(key => key !== CACHE_NAME)

                        .map(key => caches.delete(key))

                );

            })

            .then(() => {

                return self.clients.claim();

            })

    );

});


/* FETCH */

self.addEventListener("fetch", event => {

    if (event.request.method !== "GET") {
        return;
    }


    event.respondWith(

        caches.match(event.request)

            .then(cachedResponse => {

                if (cachedResponse) {

                    return cachedResponse;

                }


                return fetch(event.request)

                    .then(networkResponse => {

                        if (
                            !networkResponse ||
                            networkResponse.status !== 200 ||
                            networkResponse.type === "opaque"
                        ) {

                            return networkResponse;

                        }


                        const responseClone =
                            networkResponse.clone();


                        caches.open(CACHE_NAME)

                            .then(cache => {

                                cache.put(
                                    event.request,
                                    responseClone
                                );

                            });


                        return networkResponse;

                    })

                    .catch(() => {

                        return caches.match(
                            "./loading.html"
                        );

                    });

            })

    );

});