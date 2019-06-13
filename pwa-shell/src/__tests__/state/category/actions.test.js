import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { config } from '@entando/apimanager';
import { setCategoryList } from 'state/category/actions';
import { SET_CATEGORY_LIST } from 'state/category/types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

config(mockStore({ api: { useMocks: true }, currentUser: { token: 'asdf' } }));

const INITIAL_STATE = {};

describe('state/content/actions', () => {
  let store;
  let action;

  beforeEach(() => {
    store = mockStore(INITIAL_STATE);
    jest.clearAllMocks();
    store.clearActions();
  });

  it('setCategoryList should returns the correct object', () => {
    action = setCategoryList(['category1', 'category2', 'categoryn']);
    expect(action).toHaveProperty('type', SET_CATEGORY_LIST);
    expect(action).toHaveProperty('payload', [
      'category1',
      'category2',
      'categoryn',
    ]);
  });
});
