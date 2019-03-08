import { combineReducers } from 'redux';
import { api, currentUser } from '@entando/apimanager';
import content from 'state/content/reducer';
import contentType from 'state/contentType/reducer';
import category from 'state/category/reducer';

const rootReducer = combineReducers({
  api,
  currentUser,  
  content,
  contentType,
  category,
});

export default rootReducer;
