import { makeRequest, METHODS } from '@entando/apimanager';

export const getContentType = code => makeRequest({
  uri: `/api/plugins/cms/contentTypes/${code}?status=published`,
  method: METHODS.GET,
  mockResponse: {
    "code": "MCT",
    "name": "My Content Type",
    "status": "0",
    "attributes": [],
    "defaultContentModel": "Full",
    "defaultContentModelList": "Full"
  },
  contentType: 'application/json',
  errors: () => [],
});
