import { combineReducers } from 'redux';
import content from 'state/contentReducer';
import contentType from 'state/contentTypesReducer';

const rootReducer = combineReducers({
  content,
  contentType,
});

export default rootReducer;
