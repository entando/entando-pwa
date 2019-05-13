import { makeRequest, METHODS } from '@entando/apimanager';

export const getCategoryTree = code => makeRequest({
  uri: `/api/categories?parentCode=${code}`,
  method: METHODS.GET,
  mockResponse: [
    { 
      code: 'child1',
      parentCode: 'sample',
      titles: {
        en: 'Child 1',
        it: 'Figlio 1',
      },
      children: [],
    },
    { 
      code: 'child2',
      parentCode: 'sample',
      titles: {
        en: 'Child 2',
        it: 'Figlio 2',
      },
      children: [],
    },
  ],
  contentType: 'application/json',
  errors: () => [],
});
