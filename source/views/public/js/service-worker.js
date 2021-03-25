if ('serviceWorker' in navigator) {

    window.addEventListener('load', function() {
        navigator.serviceWorker.register('./public/js/service-worker.js')
        .then(function(registration) {
          console.log('Registration successful, scope is:', registration.scope);
        })
        .catch(function(error) {
          console.log('Service worker registration failed, error:', error);
        });
      });
}


const filesToCache = [
    '/',
    'style/main.css',
    'core.html',
  ];
  
  const staticCacheName = 'pages-cache-v1';
  
  self.addEventListener('install', event => {
    console.log('Attempting to install service worker and cache static assets');
    event.waitUntil(
      caches.open(staticCacheName)
      .then(cache => {
        return cache.addAll(filesToCache);
      })
    );
  });



  self.addEventListener('activate', event => {
    console.log('Activating new service worker...');
  
    const cacheAllowlist = [staticCacheName];
  
    event.waitUntil(
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheAllowlist.indexOf(cacheName) === -1) {
              return caches.delete(cacheName);
            }
          })
        );
      })
    );
  });



  self.addEventListener('fetch', event => {
    console.log('Fetch event for ', event.request.url);
    event.respondWith(
      caches.match(event.request)
      .then(response => {
        if (response) {
          console.log('Found ', event.request.url, ' in cache');
          return response;
        }
        console.log('Network request for ', event.request.url);
        return fetch(event.request).then(response => {
            // TODO 5 - Respond with custom 404 page
            return caches.open(staticCacheName).then(cache => {
              cache.put(event.request.url, response.clone());
              return response;
            });
          });

  
      }).catch(error => {
  
        // TODO 6 - Respond with custom offline page
  
      })
    );
  });




  // Initialize deferredPrompt for use later to show browser install prompt.
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent the mini-infobar from appearing on mobile
  e.preventDefault();
  // Stash the event so it can be triggered later.
  deferredPrompt = e;
  // Update UI notify the user they can install the PWA
//   showInstallPromotion();
  // Optionally, send analytics event that PWA install promo was shown.
  console.log(`'beforeinstallprompt' event was fired.`);
});

// var buttonInstall = document.querySelector('#buttonInstall')

// buttonInstall.addEventListener('click', async () => {
//     // Hide the app provided install promotion
//     // hideInstallPromotion();
//     // Show the install prompt
//     deferredPrompt.prompt();
//     // Wait for the user to respond to the prompt
//     const { outcome } = await deferredPrompt.userChoice;
//     // Optionally, send analytics event with outcome of user choice
//     console.log(`User response to the install prompt: ${outcome}`);
//     // We've used the prompt, and can't use it again, throw it away
//     deferredPrompt = null;
//   });

//   window.addEventListener('appinstalled', () => {
//     // Hide the app-provided install promotion
//     // hideInstallPromotion();
//     // Clear the deferredPrompt so it can be garbage collected
//     deferredPrompt = null;
//     // Optionally, send analytics event to indicate successful install
//     console.log('PWA was installed');
//   });

  