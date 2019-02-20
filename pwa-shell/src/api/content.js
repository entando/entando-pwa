import { makeRequest, METHODS } from '@entando/apimanager';

export const getContentList = type => makeRequest({
  uri: '/api/plugins/cms/contents?filters[0].attribute=typeCode&filters[0].operator=eq&filters[0].value=' + type + '&status=published&modelId=list',
  method: METHODS.GET,
  mockResponse: [{ name: 'Paolino', surname: 'Paperino'}],
  contentType: 'application/json',
  errors: () => [],
});

export const getContentDetail = id => makeRequest({
  uri: '/api/plugins/cms/contents/' + id,
  method: METHODS.GET,
  mockResponse: [{ name: 'Paolino', surname: 'Paperino'}],
  contentType: 'application/json',
  errors: () => [],
});
