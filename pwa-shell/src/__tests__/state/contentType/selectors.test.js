import {
  getSelectedContentType,
  getContentTypeCodeList,
  getDefaultContentTypeCode,
  getContentTypeMap,
} from 'state/contentType/selectors';
import { contentTypeCodeList as codeList } from 'state/appConfig';
import { GET_CONTENT_TYPE_RESPONSE_OK } from 'mocks/contentType';

const contentTypeMap = [GET_CONTENT_TYPE_RESPONSE_OK].reduce(
  (acc, curr) => ({
    ...acc,
    [curr.code]: curr,
  }),
  {},
);

const STATE = {
  contentType: {
    codeList,
    selected: 'NWS',
    map: contentTypeMap,
  },
};

describe('state/contentType/selectors', () => {
  it('getSelectedContentType returns the selected code', () => {
    expect(getSelectedContentType(STATE)).toEqual(STATE.contentType.selected);
  });
  it('getContentTypeCodeList returns the codeList array', () => {
    expect(getContentTypeCodeList(STATE)).toEqual(codeList);
  });
  it('getDefaultContentTypeCode returns default (first index) code', () => {
    expect(getDefaultContentTypeCode(STATE)).toEqual(codeList[0]);
  });
  it('getContentTypeMap has correct info', () => {
    const map = getContentTypeMap(STATE);
    expect(map).toEqual(STATE.contentType.map);
    expect(Object.keys(map)[0]).toEqual(codeList[0]);
  });
});
