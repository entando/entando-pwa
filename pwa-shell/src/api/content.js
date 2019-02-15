const standaloneGetContentList = type => fetch(`https://jsonplaceholder.typicode.com/${type}`);
const standaloneGetContentDetail = (type, id) => fetch(`https://jsonplaceholder.typicode.com/${type}/${id}`);

const baseEndpoint = 'http://tests.serv.run/entando-sample/api/plugins/cms/contents';

const params = '?filters[0].attribute=typeCode&filters[0].operator=eq&filters[0].value=';

const realGetContentList = type => fetch(`${baseEndpoint}${params}${type}`);
const realGetContentDetail = (type, id) => fetch(`${baseEndpoint}/${id}`);

export const getContentList = process.env.REACT_APP_STANDALONE === 'true' ? standaloneGetContentList : realGetContentList;
export const getContentDetail = process.env.REACT_APP_STANDALONE === 'true' ? standaloneGetContentDetail : realGetContentDetail;
