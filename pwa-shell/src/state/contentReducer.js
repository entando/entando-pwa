import { FILTER_OPERATORS } from '@entando/utils';
import { SET_CONTENT_FILTER, SET_CONTENT_LIST, SET_SELECTED_CONTENT } from 'state/types';
import { contentTypeCodeList } from 'state/appConfig';

const filters = contentTypeCodeList.reduce((acc, curr) => ({
  ...acc,
  [curr]: {
    formValues: { typeCode: [curr] },
    operators: { typeCode: FILTER_OPERATORS.EQUAL },
  }
}), {});

const initialState = {
  list: [],
  filters,
  selected: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CONTENT_LIST:
      return {
        ...state,
        list:  action.payload,    
      };
    case SET_SELECTED_CONTENT:
      return {
        ...state,
        selected: action.payload,
      };
    case SET_CONTENT_FILTER:
      return {
        ...state,
        filters:  {
         ...state.filters,
         [action.payload.contentType]: action.payload.filter,
        },
      };
    default:
      return state;
  }
};
