self.addEventListener('install', function (event) {
    console.log('Service Worker installing.');
    event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', function (event) {
    console.log('Service Worker activating.');
    event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', function (event) {
    console.log('Fetching:', event.request.url);
    
    // Example: Intercepting and modifying requests
    if (event.request.url.includes('example.com')) {
        event.respondWith(
            fetch(event.request).then(function (response) {
                // Modify the response if needed
                return response;
            }).catch(function (error) {
                console.error('Fetch failed:', error);
                throw error;
            })
        );
    } else {
        event.respondWith(fetch(event.request));
    }
});
