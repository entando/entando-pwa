import { makeRequest, METHODS } from '@entando/apimanager';

const defaultPageObject = { page: 1, pageSize: 10 };

export const getContentList = (params = '', page = defaultPageObject) => (
  makeRequest(
    {  
      uri: `/api/plugins/cms/contents${params}`,
      method: METHODS.GET,
      mockResponse: [{ __html: '<div>Sample Article</div>'}],
      contentType: 'application/json',
      errors: () => [],
    },
    page,
  )
);

export const getContentDetail = code => makeRequest({
  uri: `/api/plugins/cms/contents/${code}/model/default?status=published`,
  method: METHODS.GET,
  mockResponse: { __html: '<div>Sample Article</div>'},
  contentType: 'application/json',
  errors: () => [],
});
