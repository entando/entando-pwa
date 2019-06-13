import {
  getCategoryRootCodes,
  getCategoryList,
  getCategoryMap,
} from 'state/category/selectors';
import { GET_CATEGORY_RESPONSE_OK } from 'mocks/category';

const STATE = {
  category: {
    rootCodes: {
      child1: 'home',
    },
    list: GET_CATEGORY_RESPONSE_OK,
  },
};

describe('state/category/selectors', () => {
  it('getCategoryRootCodes returns the rootCodes state', () => {
    expect(getCategoryRootCodes(STATE)).toEqual(STATE.category.rootCodes);
  });
  it('getCategoryList returns the list state', () => {
    expect(getCategoryList(STATE)).toEqual(STATE.category.list);
  });
  it('getCategoryMap returns the requested category info', () => {
    expect(getCategoryMap(STATE)).toEqual(STATE.category.list[0]);
  });
});
