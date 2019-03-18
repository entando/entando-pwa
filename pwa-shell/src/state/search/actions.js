import { OPEN_SEARCH, CLOSE_SEARCH } from 'state/search/types';

export const openSearch = () => ({
  type: OPEN_SEARCH,
});

export const closeSearch = () => ({
  type: CLOSE_SEARCH,
});
