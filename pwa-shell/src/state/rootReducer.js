import { combineReducers } from 'redux';
import { api, currentUser } from '@entando/apimanager';
import content from 'state/content/reducer';
import contentType from 'state/contentType/reducer';

const rootReducer = combineReducers({
  api,
  currentUser,  
  content,
  contentType,
});

export default rootReducer;
