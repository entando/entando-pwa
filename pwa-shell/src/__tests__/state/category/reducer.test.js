import reducer from 'state/category/reducer';
import { setCategoryList } from 'state/category/actions';
import { GET_CATEGORY_RESPONSE_OK } from 'mocks/category';

describe('state/category/reducer', () => {
  it('should return an object', () => {
    const state = reducer({}, {});
    expect(typeof state).toBe('object');
  });

  describe('after action setCategoryList', () => {
    let state = reducer({}, setCategoryList(GET_CATEGORY_RESPONSE_OK));

    it('should define the category list and has same length from mocks', () => {
      expect(state.list).toBeDefined();
      expect(state.list).toHaveLength(GET_CATEGORY_RESPONSE_OK.length);
    });
  });
});
