// TODO workaround: we need to get base URL from .env variables

workbox.routing.registerRoute(
  new RegExp('http://localhost:8080/pwa-provider/api/*'),
  new workbox.strategies.NetworkFirst()
);

workbox.routing.registerRoute(
  new RegExp('https://pwa-provider.dev.entando.org/pwa-provider/api/*'),
  new workbox.strategies.NetworkFirst()
);
