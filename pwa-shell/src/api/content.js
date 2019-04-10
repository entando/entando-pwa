import { makeRequest, METHODS } from '@entando/apimanager';

const defaultPageObject = { page: 1, pageSize: 10 };

export const getContents = (params = '?lang=it', page = defaultPageObject) => (
  makeRequest(
    {  
      uri: `/api/plugins/cms/contents${params}&lang=it`,
      method: METHODS.GET,
      mockResponse: [{ __html: '<div>Sample Article</div>'}],
      contentType: 'application/json',
      errors: () => [],
    },
    page,
  )
);

export const getContent = code => makeRequest({
  uri: `/api/plugins/cms/contents/${code}/model/default?status=published&lang=it`,
  method: METHODS.GET,
  mockResponse: { __html: '<div>Sample Article</div>'},
  contentType: 'application/json',
  errors: () => [],
});
