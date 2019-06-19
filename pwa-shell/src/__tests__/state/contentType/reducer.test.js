import reducer from 'state/contentType/reducer';
import {
  setContentTypeMap,
  setSelectedContentType,
} from 'state/contentType/actions';
import { GET_CONTENT_TYPE_RESPONSE_OK } from 'mocks/contentType';

describe('state/contentType/reducer', () => {
  it('should return an object', () => {
    const state = reducer({}, {});
    expect(typeof state).toBe('object');
  });

  describe('after action setContentTypeMap', () => {
    const contentTypeMap = [GET_CONTENT_TYPE_RESPONSE_OK].reduce(
      (acc, curr) => ({
        ...acc,
        [curr.code]: curr,
      }),
      {},
    );
    let state = reducer({}, setContentTypeMap(contentTypeMap));

    it('should define the content type map and has same length and content from mocks', () => {
      const code = GET_CONTENT_TYPE_RESPONSE_OK.code;
      expect(state.map).toBeDefined();
      expect(Object.keys(state.map)).toHaveLength(1);
      expect(state.map[code].code).toEqual(code);
    });
  });

  describe('after action setContentTypeMap', () => {
    let code = 'JTG';
    let state = reducer({}, setSelectedContentType(code));

    it('should define the selected content type and has correct value', () => {
      expect(state.selected).toBeDefined();
      expect(state.selected).toEqual(code);
    });
  });
});
