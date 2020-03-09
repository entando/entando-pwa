const IS_PRODUCTION_ENV = process.env.NODE_ENV === 'production';

export const GTM_TRACKING_ID = process.env.REACT_APP_GTM_TRACKING_ID;

export const GTAG_JS_URL = `https://www.googletagmanager.com/gtag/js?id=${GTM_TRACKING_ID}`;

export const initializeGtm = () => {
  if (!IS_PRODUCTION_ENV) {
    return;
  }

  if (!GTM_TRACKING_ID) {
    console.warn(
      'No Google Tag Manager tracking ID set. If you need it, please set the REACT_APP_GTM_TRACKING_ID environment variable',
    );
    return;
  }

  const dataLayer = window.dataLayer || [];
  const gtag = function() {
    dataLayer.push(arguments);
  };
  gtag('js', new Date());
  gtag('config', GTM_TRACKING_ID);
  window.gtag = gtag;
};

export const sendPageView = (previousPathname, pathname, historyAction) => {
  const gtag = window.gtag;
  if (
    IS_PRODUCTION_ENV &&
    pathname !== previousPathname &&
    ['PUSH', 'POP'].includes(historyAction) &&
    typeof gtag === 'function'
  ) {
    gtag('config', GTM_TRACKING_ID, {
      page_location: window.location.href,
      page_path: pathname,
    });
  }
};
