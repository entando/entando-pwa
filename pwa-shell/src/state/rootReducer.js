import { combineReducers } from 'redux';
import { api, currentUser } from '@entando/apimanager';
import { messages } from '@entando/messages';
import { reducer as form } from 'redux-form';
import notification from 'state/notification/reducer';
import content from 'state/content/reducer';
import contentType from 'state/contentType/reducer';
import category from 'state/category/reducer';
import drawer from 'state/drawer/reducer';
import search from 'state/search/reducer';
import network from 'state/network/reducer';

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
});

export default rootReducer;
