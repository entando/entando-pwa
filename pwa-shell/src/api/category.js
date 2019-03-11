import { makeMockRequest, METHODS } from '@entando/apimanager';

export const getCategory = code => makeMockRequest({
  uri: `/api/categories/${code}`,
  method: METHODS.GET,
  mockResponse: { 
    code: 'sample',
    parentCode: 'home',
    titles: {
        en: 'Sample Category',
        it: 'Categoria di Esempio',
    },
    children: [
        'sample_child_1',
        'sample_child_2',
    ]
  },
  contentType: 'application/json',
  errors: () => [],
});
