import { makeRequest, METHODS } from '@entando/apimanager';
import { GET_CONTENT_TYPE_RESPONSE_OK } from 'mocks/contentType';

export const getContentType = code =>
  makeRequest({
    uri: `/api/plugins/cms/contentTypes/${code}?status=published`,
    method: METHODS.GET,
    mockResponse: GET_CONTENT_TYPE_RESPONSE_OK,
    contentType: 'application/json',
    errors: () => [],
  });
