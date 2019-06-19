import {
  getCategoryRootCodes,
  getCategoryList,
  getCategoryMap,
  getCategoryRootCode,
} from 'state/category/selectors';
import { contentTypeCodeList as codeList } from 'state/appConfig';
import { GET_CONTENT_TYPE_RESPONSE_OK } from 'mocks/contentType';
import { GET_CATEGORY_RESPONSE_OK } from 'mocks/category';

const contentTypeMap = [GET_CONTENT_TYPE_RESPONSE_OK].reduce(
  (acc, curr) => ({
    ...acc,
    [curr.code]: curr,
  }),
  {},
);

const STATE = {
  category: {
    rootCodes: {
      NWS: 'home',
    },
    list: GET_CATEGORY_RESPONSE_OK,
  },
  contentType: {
    codeList,
    selected: 'NWS',
    map: contentTypeMap,
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
    const catItem = STATE.category.list[0];
    const ncode = catItem.code;
    expect(getCategoryMap(STATE)[ncode]).toEqual(catItem);
  });
  it('getCategoryRootCode returns the requested category info', () => {
    expect(getCategoryRootCode(STATE)).toEqual(STATE.category.rootCodes.NWS);
  });
});
