import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { config } from '@entando/apimanager';
import { setContentTypeMap, setSelectedContentType } from 'state/contentType/actions';
import { SET_CONTENT_TYPE_MAP, SET_SELECTED_CONTENT_TYPE } from 'state/contentType/types';

const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);

config(mockStore({ api: { useMocks: true }, currentUser: { token: 'asdf' } }));

const INITIAL_STATE = {};

describe('state/contentType/actions', () => {
  let store;
  let action;
  
  beforeEach(() => {
    store = mockStore(INITIAL_STATE);
    jest.clearAllMocks();
    store.clearActions();
  });
  
  it('setContentTypeMap should returns the correct object', () => {
    action = setContentTypeMap({ sampleContentType: { prop1: 'prop1', prop2: 'prop2' }});
    expect(action).toHaveProperty('type', SET_CONTENT_TYPE_MAP);
    expect(action).toHaveProperty('payload', { sampleContentType: { prop1: 'prop1', prop2: 'prop2' }});
  });  

  it('setSelectedContentType should returns the correct object', () => {
    action = setSelectedContentType('contentType');
    expect(action).toHaveProperty('type', SET_SELECTED_CONTENT_TYPE);
    expect(action).toHaveProperty('payload', 'contentType');
  });    
});
