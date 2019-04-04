import React from 'react';
import { Helmet } from 'react-helmet';

import icon192 from 'images/apple-touch/icon-192.png';

import launch1125x2436 from 'images/apple-touch/launch-1125x2436.png';
import launch1242x2208 from 'images/apple-touch/launch-1242x2208.png';
import launch750x1334 from 'images/apple-touch/launch-750x1334.png';
import launch2048x2732 from 'images/apple-touch/launch-2048x2732.png';
import launch1668x2388 from 'images/apple-touch/launch-1668x2388.png';
import launch1668x2224 from 'images/apple-touch/launch-1668x2224.png';
import launch1536x2048 from 'images/apple-touch/launch-1536x2048.png';

const name = 'Info Esercito Italiano';
const shortName = 'Info EI';
const startupImageRel = 'apple-touch-startup-image';
const links = [
  {
    rel: 'apple-touch-icon',
    href: icon192,
  },
  { // iPhone X, Xs (1125px x 2436px)
    rel: startupImageRel,
    media: '(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)',
    href: launch1125x2436,
  },
  { // iPhone 8 Plus, 7 Plus, 6s Plus, 6 Plus (1242px x 2208px) 
    rel: startupImageRel,
    media: '(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3)',
    href: launch1242x2208,
  },
  { // iPhone 8, 7, 6s, 6
    rel: startupImageRel,
    media: '(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2)',
    href: launch750x1334,
  },  
  { // iPad Pro 12.9" (2048px x 2732px)
    rel: startupImageRel,
    media: '(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2)',
    href: launch2048x2732,
  },  
  { // iPad Pro 11” (1668px x 2388px)
    rel: startupImageRel,
    media: '(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2)',
    href: launch1668x2388,
  },  
  { // iPad Pro 10.5" (1668px x 2224px)
    rel: startupImageRel,
    media: '(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2)',
    href: launch1668x2224,
  },  
  { // iPad Mini, Air (1536px x 2048px)
    rel: startupImageRel,
    media: '(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2)',
    href: launch1536x2048,
  },
];

const metas = [
  {
    name: 'apple-mobile-web-app-capable',
    content: 'yes',
  },
  {
    name: 'apple-mobile-web-app-title',
    content: shortName,
  },
];

const HomePageHead = () => (
  <Helmet>
    <title>{name}</title>
    {links.map((link, i) => <link key={`link-${i}`} {...link} />)}
    {metas.map((meta, i) => <meta key={`meta-${i}`} {...meta} />)}
  </Helmet>
);

export default HomePageHead;
