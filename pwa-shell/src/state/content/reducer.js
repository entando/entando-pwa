import { get } from 'lodash';
import { FILTER_OPERATORS } from '@entando/utils';
import {
  SET_CONTENT_FILTER,
  SET_CONTENT_LIST,
  PUSH_CONTENT_LIST,
  SET_CONTENT_LIST_META,
  SET_SELECTED_CONTENT,
  UNSET_SELECTED_CONTENT,
  SET_CATEGORY_FILTER,
  SET_SORTING_FILTER,
  SET_IS_SEARCH_RESULT,
  UNSET_IS_SEARCH_RESULT,
  SET_IS_LOADING,
  UNSET_IS_LOADING,
  SET_REQUIRES_AUTH,
  SET_REQUIRES_AUTH_MAP,
} from 'state/content/types';
import { contentTypeCodeList, sortingFilters } from 'state/appConfig';
import { htmlSanitizer } from 'helpers';

const filters = contentTypeCodeList.reduce(
  (acc, curr) => ({
    ...acc,
    [curr]: {
      formValues: { typeCode: [curr] },
      operators: { typeCode: FILTER_OPERATORS.EQUAL },
    },
  }),
  {},
);

const initialState = {
  list: [],
  listMeta: {},
  filters,
  requiresAuthMap: {},
  categoryFilters: {},
  sortingFilters,
  selected: null,
  isSearchResult: false,
  isLoading: false,
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_IS_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case UNSET_IS_LOADING:
      return {
        ...state,
        isLoading: false,
      };
    case SET_IS_SEARCH_RESULT:
      return {
        ...state,
        isSearchResult: true,
      };
    case UNSET_IS_SEARCH_RESULT:
      return {
        ...state,
        isSearchResult: false,
      };
    case SET_CONTENT_LIST:
      return {
        ...state,
        list: action.payload,
      };
    case PUSH_CONTENT_LIST:
      return {
        ...state,
        list: [...state.list, ...action.payload],
      };
    case SET_CONTENT_LIST_META:
      return {
        ...state,
        listMeta: action.payload,
      };
    case SET_SELECTED_CONTENT:
      return {
        ...state,
        selected: {
          ...action.payload,
          html: htmlSanitizer(action.payload.html),
        },
      };
    case UNSET_SELECTED_CONTENT:
      return {
        ...state,
        selected: {
          html: '',
        },
      };
    case SET_CONTENT_FILTER:
      return {
        ...state,
        filters: {
          ...state.filters,
          [action.payload.contentType]: action.payload.filter,
        },
      };
    case SET_CATEGORY_FILTER:
      return {
        ...state,
        categoryFilters: {
          ...state.categoryFilters,
          [action.payload.contentType]: action.payload.filter,
        },
      };
    case SET_SORTING_FILTER:
      return {
        ...state,
        sortingFilters: {
          ...state.sortingFilters,
          [action.payload.contentType]: action.payload.filter,
        },
      };
    case SET_REQUIRES_AUTH:
      return {
        ...state,
        requiresAuthMap: {
          ...state.requiresAuthMap,
          [action.payload.id]: action.payload.requiresAuth,
        },
      };
    case SET_REQUIRES_AUTH_MAP:
      return {
        ...state,
        requiresAuthMap: action.payload.reduce(
          (acc, curr) => ({
            ...acc,
            [curr.id]:
              get(curr, 'groups.length', 0) !== 1 ||
              get(curr, 'groups[0]', '').toLowerCase() !== 'free',
          }),
          {},
        ),
      };
    default:
      return state;
  }
};
