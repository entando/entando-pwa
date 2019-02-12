import { combineReducers } from 'redux';
import list from 'state/contentListReducer';
import detail from 'state/contentDetailReducer';
import types from 'state/contentTypesReducer';

const rootReducer = combineReducers({
  list,
  detail,
  types,
});

export default rootReducer;
