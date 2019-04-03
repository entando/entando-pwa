import {
  OPEN_SEARCH,
  CLOSE_SEARCH,
  SET_SEARCH,
} from 'state/search/types';

export const openSearch = () => ({
  type: OPEN_SEARCH,
});

export const closeSearch = () => ({
  type: CLOSE_SEARCH,
});

export const setSearch = search => ({
  type: SET_SEARCH,
  payload: search,
});
