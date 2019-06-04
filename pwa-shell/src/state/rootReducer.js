import { combineReducers } from 'redux';
import { api, currentUser } from '@entando/apimanager';
import { messages } from '@entando/messages';
import { reducer as form } from 'redux-form';
import { persistReducer } from 'redux-persist';
import localForage from 'localforage';

import notification from 'state/notification/reducer';
import content from 'state/content/reducer';
import contentType from 'state/contentType/reducer';
import category from 'state/category/reducer';
import drawer from 'state/drawer/reducer';
import search from 'state/search/reducer';
import network from 'state/network/reducer';
import language from 'state/language/reducer';
import userProfile from 'state/user-profile/reducer';

const storage = localForage;

const rootReducer = combineReducers({
  api,
  currentUser,
  messages,
  notification,
  content: persistReducer(
    {
      key: 'content',
      storage,
      whitelist: ['categoryFilters', 'isSearchResult'],
    },
    content,
  ),
  contentType,
  category,
  drawer,
  form,
  search: persistReducer({ key: 'search', storage }, search),
  network,
  language,
  userProfile,
});

export default rootReducer;
