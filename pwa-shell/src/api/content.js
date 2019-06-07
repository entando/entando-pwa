import { makeRequest, METHODS } from '@entando/apimanager';
import {
  GET_CONTENTS_RESPONSE_OK,
  PUBLIC_CONTENT,
  PROTECTED_CONTENT,
} from '__tests__/mocks/content';

const defaultPageObject = { page: 1, pageSize: 10 };

export const getContents = (params = '', page = defaultPageObject) =>
  makeRequest(
    {
      uri: `/api/plugins/cms/contents${params}`,
      method: METHODS.GET,
      mockResponse: GET_CONTENTS_RESPONSE_OK,
      contentType: 'application/json',
      errors: () => [],
    },
    page,
  );

export const getContent = (code, params = '?status=published') =>
  makeRequest({
    uri: `/api/plugins/cms/contents/${code}/model/default${params}`,
    method: METHODS.GET,
    mockResponse: PUBLIC_CONTENT,
    contentType: 'application/json',
    useAuthentication: true, //SME DEMO WORKAROUND
    errors: () => [],
  });

export const getProtectedContent = (code, params = '?status=published') =>
  makeRequest({
    uri: `/api/plugins/cms/contents/${code}/model/default${params}`,
    method: METHODS.GET,
    mockResponse: PROTECTED_CONTENT,
    contentType: 'application/json',
    useAuthentication: true,
    errors: () => [],
  });
