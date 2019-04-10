import { makeRequest, METHODS } from '@entando/apimanager';
import { GET_CONTENTS_RESPONSE_OK, PUBLIC_CONTENT, PROTECTED_CONTENT } from '__tests__/mocks/content';

const defaultPageObject = { page: 1, pageSize: 10 };

export const getContents = (params = '?lang=it', page = defaultPageObject) => (
  makeRequest(
    {  
      uri: `/api/plugins/cms/contents${params}&lang=it`,
      method: METHODS.GET,
      mockResponse: GET_CONTENTS_RESPONSE_OK,
      contentType: 'application/json',
      errors: () => [],
    },
    page,
  )
);

export const getContent = code => makeRequest({
  uri: `/api/plugins/cms/contents/${code}/model/default?status=published&lang=it`,
  method: METHODS.GET,
  mockResponse: PUBLIC_CONTENT,
  contentType: 'application/json',
  errors: () => [],
});

export const getProtectedContent = code => makeRequest({
  uri: `/api/plugins/cms/contents/${code}/model/default?status=published&lang=it`,
  method: METHODS.GET,
  mockResponse: PROTECTED_CONTENT,
  contentType: 'application/json',
  useAuthentication: true,
  errors: () => [],
});
