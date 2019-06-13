const NOTIFICATION_HTML_1 = `
  <article>
    <p class="text-right">
        <time class="label" datetime="24/04/19">24th April 2019</time>
    </p>
    <h2 style="word-break: break-word;">Sample notification 1"</h2>
    Sample  Notification 1 body
    <p class="text-right"><a class="btn" href="#!C;NWS33!#">Continua</a></p>
  </article>
`;

export const GET_NOTIFICATIONS_RESPONSE_OK = [
  {
    id: 1,
    type: 'cms-content',
    objectId: 'NWS118',
    date: '2019-04-24 13:06:49',
    title: 'Sample notification 1',
    body: NOTIFICATION_HTML_1,
    properties: {
      contentType: 'NWS',
    },
    categories: ['varie'],
  },
];
