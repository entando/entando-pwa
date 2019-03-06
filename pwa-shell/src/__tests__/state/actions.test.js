import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { config } from '@entando/apimanager';
import {
  setContentList,
  setSelectedContent,
  setContentTypeMap,
  setSelectedContentType
} from 'state/actions';
import {
  SET_CONTENT_LIST,
  SET_SELECTED_CONTENT,
  SET_CONTENT_TYPE_MAP,
  SET_SELECTED_CONTENT_TYPE,
} from 'state/types';

const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);

config(mockStore({ api: { useMocks: true }, currentUser: { token: 'asdf' } }));

const INITIAL_STATE = {};

describe('state/actions', () => {
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
