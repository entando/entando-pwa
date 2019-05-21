importScripts('swenv.js');

workbox.routing.registerRoute(
  new RegExp(`${process.env.REACT_APP_DOMAIN}/api/*`),
  new workbox.strategies.NetworkFirst(),
);
