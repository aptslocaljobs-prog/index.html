/* Push handler. In your EXISTING sw.js add this single line at the very top:
     importScripts('push-sw.js');
   (Upload this file next to sw.js / index.html.) */
self.addEventListener('push', event => {
  let d = {};
  try { d = event.data ? event.data.json() : {}; } catch (e) { d = { title: 'New job update', body: event.data ? event.data.text() : '' }; }
  event.waitUntil(self.registration.showNotification(d.title || 'New job update', {
    body: d.body || '', icon: 'icon-192.png', badge: 'icon-192.png',
    tag: d.tag || undefined, data: { url: d.url || '/' }
  }));
});
self.addEventListener('notificationclick', event => {
  event.notification.close();
  const url = new URL((event.notification.data && event.notification.data.url) || '/', self.location.origin).href;
  event.waitUntil(clients.matchAll({ type: 'window', includeUncontrolled: true }).then(list => {
    for (const c of list) if (c.url.split('#')[0] === url.split('#')[0] && 'focus' in c) { c.navigate(url); return c.focus(); }
    return clients.openWindow(url);
  }));
});
