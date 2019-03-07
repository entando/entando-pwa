import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { config } from '@entando/apimanager';
import { setContentList, setSelectedContent } from 'state/content/actions';
import { SET_CONTENT_LIST, SET_SELECTED_CONTENT } from 'state/content/types';

const middlewares = [ thunk ];
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
  
  it('setContentList should returns the correct object', () => {
    action = setContentList(['contentType1', 'contentType2']);
    expect(action).toHaveProperty('type', SET_CONTENT_LIST);
    expect(action).toHaveProperty('payload', ['contentType1', 'contentType2']);
  });

  it('setSelectedContent should returns the correct object', () => {
    action = setSelectedContent({ id: '1', title: 'title'});
    expect(action).toHaveProperty('type', SET_SELECTED_CONTENT);
    expect(action).toHaveProperty('payload', { id: '1', title: 'title'});
  });  
});
