const NOTIFICATION_HTML_36 = `
  <article>
    <p class="text-right">
        <time class="label" datetime="18/03/19">lunedì 18 marzo 2019</time>
    </p>
    <h2 style="word-break: break-word;">Concorso fotografico &quot;Uno scatto in avanti: Le donne nella Difesa&quot; Fotografia un'idea.</h2> Il concorso fotografico "Uno scatto in avanti: le Donne nella Difesa" promosso dal Comitato Unico di Garanzia (CUG), è stato presentato nel corso del convegno "Le donne italiane dalla Grande Guerra all'Amministrazione dello Stato. La Difesa racconta le sue Donne", svoltosi il 6 giugno u.s. presso la Sala Conferenze di Palazzo Guidoni, sede del Segretariato Generale della Difesa e Direzione Nazionale degli Armamenti.
    <p class="text-right"><a class="btn" href="#!C;NWS36!#">Continua</a></p>
  </article>
`;

const NOTIFICATION_HTML_33 = `
  <article>
    <p class="text-right">
        <time class="label" datetime="18/03/19">lunedì 18 marzo 2019</time>
    </p>
    <h2 style="word-break: break-word;">Concorso VFP1 - 2' Blocco 2019</h2> Per il 2019 è indetto il reclutamento nell'Esercito di 8.000 VFP 1, ripartiti nei seguenti quattro blocchi di incorporamento.
    <p class="text-right"><a class="btn" href="#!C;NWS33!#">Continua</a></p>
  </article>
`;

export const GET_NOTIFICATIONS_RESPONSE_OK = [
  {
    id: 'NWS36',
    typeCode: 'NWS',
    isUnread: true,
    requiresAuth: false,
    html: NOTIFICATION_HTML_36,
  },
  {
    id: 'NWS33',
    typeCode: 'NWS',
    isUnread: true,
    requiresAuth: false,
    html: NOTIFICATION_HTML_33,
  },
];
