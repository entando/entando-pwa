import { combineReducers } from 'redux';
import content from 'state/contentReducer';
import contentType from 'state/contentTypeReducer';

const rootReducer = combineReducers({
  content,
  contentType,
});

export default rootReducer;
