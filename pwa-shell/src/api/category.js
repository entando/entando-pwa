import { makeRequest, METHODS } from '@entando/apimanager';

export const getCategory = code => makeRequest({
  uri: `/api/categories?parentCode=${code}`,
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
    ],
    references: {},
  },
  contentType: 'application/json',
  errors: () => [],
});
