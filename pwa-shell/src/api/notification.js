import { makeRequest, METHODS } from '@entando/apimanager';

const defaultPageObject = { page: 1, pageSize: 10 };

export const getNotifications = (params = '?lang=it', page = defaultPageObject) => (
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
