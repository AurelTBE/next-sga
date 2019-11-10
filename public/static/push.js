'use strict';

console.log("Coucou de push listener")

self.addEventListener('push', function(event) {
    console.log('[Service Worker] Push Received.');
    console.log(`[Service Worker] Push had this data: "${event.data.text()}"`);
  
    const title = 'SGA News';
    const options = {
      body: 'Du nouveau sur la SGA',
      icon: 'images/icon.png',
      badge: 'images/badge.png'
    };
  
    const notificationPromise = self.registration.showNotification(title, options);
    event.waitUntil(notificationPromise);
  });

  self.addEventListener('notificationclick', function(event) {
    console.log('[Service Worker] Notification click Received.');
  
    event.notification.close();
  
    event.waitUntil(
      clients.openWindow('https://sgagymfem.com')
    );
  });