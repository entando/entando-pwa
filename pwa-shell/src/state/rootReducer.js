import { combineReducers } from 'redux';
import { api, currentUser } from '@entando/apimanager';
import content from 'state/contentReducer';
import contentType from 'state/contentTypeReducer';

const rootReducer = combineReducers({
  api,
  currentUser,  
  content,
  contentType,
});

export default rootReducer;
