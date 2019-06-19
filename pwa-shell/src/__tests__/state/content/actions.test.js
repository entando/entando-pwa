import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { config } from '@entando/apimanager';
import {
  setContentList,
  setSelectedContent,
  setContentFilter,
  setCategoryFilter,
  setSortingFilter,
  pushContentList,
  setContentListMeta,
  unsetSelectedContent,
  setRequiresAuth,
  setRequiresAuthMap,
} from 'state/content/actions';
import {
  SET_CONTENT_LIST,
  SET_SELECTED_CONTENT,
  SET_CONTENT_FILTER,
  SET_CATEGORY_FILTER,
  SET_SORTING_FILTER,
  PUSH_CONTENT_LIST,
  SET_CONTENT_LIST_META,
  UNSET_SELECTED_CONTENT,
  SET_REQUIRES_AUTH,
  SET_REQUIRES_AUTH_MAP,
} from 'state/content/types';

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

  it('setContentList and pushContentList should call correct properties', () => {
    action = setContentList(['contentType1', 'contentType2']);
    expect(action).toHaveProperty('type', SET_CONTENT_LIST);
    expect(action).toHaveProperty('payload', ['contentType1', 'contentType2']);
    action = pushContentList(['contentType3', 'contentType4']);
    expect(action).toHaveProperty('type', PUSH_CONTENT_LIST);
    expect(action).toHaveProperty('payload', ['contentType3', 'contentType4']);
  });

  it('(un)setSelectedContent should have correct payload', () => {
    action = setSelectedContent({ id: '1', title: 'title' });
    expect(action).toHaveProperty('type', SET_SELECTED_CONTENT);
    expect(action).toHaveProperty('payload', { id: '1', title: 'title' });
    action = unsetSelectedContent();
    expect(action).toHaveProperty('type', UNSET_SELECTED_CONTENT);
  });

  it('Filters should call correct properties', () => {
    action = setContentFilter(['contentType1', 'contentType2'], 'NWS');
    expect(action).toHaveProperty('type', SET_CONTENT_FILTER);
    expect(action.payload).toBeDefined();
    expect(Object.keys(action.payload)[0]).toEqual('filter');
    expect(Object.keys(action.payload)[1]).toEqual('contentType');
    expect(action.payload).toHaveProperty('filter', [
      'contentType1',
      'contentType2',
    ]);
    expect(action.payload).toHaveProperty('contentType', 'NWS');

    action = setCategoryFilter('home', 'NWS');
    expect(action).toHaveProperty('type', SET_CATEGORY_FILTER);
    expect(Object.keys(action.payload)[0]).toEqual('filter');
    expect(Object.keys(action.payload)[1]).toEqual('contentType');
    expect(action.payload).toHaveProperty('filter', 'home');
    expect(action.payload).toHaveProperty('contentType', 'NWS');

    action = setSortingFilter('ASC', 'NWS');
    expect(action).toHaveProperty('type', SET_SORTING_FILTER);
    expect(Object.keys(action.payload)[0]).toEqual('filter');
    expect(Object.keys(action.payload)[1]).toEqual('contentType');
    expect(action.payload).toHaveProperty('filter', 'ASC');
    expect(action.payload).toHaveProperty('contentType', 'NWS');
  });

  it('contentListMeta stuff', () => {
    action = setContentListMeta({ page: 1, pageSize: 10 });
    expect(action).toHaveProperty('type', SET_CONTENT_LIST_META);
    expect(action.payload).toBeDefined();
    expect(action.payload).toHaveProperty('page', 1);
  });

  it('setRequiresAuth stuff', () => {
    action = setRequiresAuth(1, true);
    expect(action).toHaveProperty('type', SET_REQUIRES_AUTH);
    expect(action.payload).toBeDefined();
    expect(action.payload).toHaveProperty('requiresAuth', true);
  });

  it('setRequiresMap stuff', () => {
    action = setRequiresAuthMap({ a: 1, b: 2 });
    expect(action).toHaveProperty('type', SET_REQUIRES_AUTH_MAP);
    expect(action.payload).toBeDefined();
    expect(action.payload).toHaveProperty('b', 2);
  });
});
