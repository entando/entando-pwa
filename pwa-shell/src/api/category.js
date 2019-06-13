import { makeRequest, METHODS } from '@entando/apimanager';
import { GET_CATEGORY_RESPONSE_OK } from 'mocks/category';

export const getCategoryTree = code =>
  makeRequest({
    uri: `/api/categories?parentCode=${code}`,
    method: METHODS.GET,
    mockResponse: GET_CATEGORY_RESPONSE_OK,
    contentType: 'application/json',
    errors: () => [],
  });
