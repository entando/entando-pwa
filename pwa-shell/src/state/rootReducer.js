import { combineReducers } from 'redux';
import { api, currentUser } from '@entando/apimanager';
import { messages } from '@entando/messages';
import { reducer as form } from 'redux-form';
import notification from 'state/notification/reducer';
import contentReducer from 'state/content/reducer';
import contentType from 'state/contentType/reducer';
import category from 'state/category/reducer';
import drawer from 'state/drawer/reducer';
import searchReducer from 'state/search/reducer';
import network from 'state/network/reducer';
import language from 'state/language/reducer';
import { persistReducer } from 'redux-persist';
import localForage from 'localforage';

const persist = (key, whitelist, reducer) =>
  persistReducer({ key, storage: localForage, whitelist }, reducer);

const content = persist(
  'content',
  ['categoryFilters', 'isSearchResult'],
  contentReducer,
);

const search = persist('search', null, searchReducer);

const rootReducer = combineReducers({
  api,
  currentUser,
  messages,
  notification,
  content,
  contentType,
  category,
  drawer,
  form,
  search,
  network,
  language,
});

export default rootReducer;
