import { createSelector } from 'reselect';

export const getSearch = state => state.search;

export const isOpen = createSelector(
  getSearch,
  search => search.isOpen,
);

export const getSearchTerms = createSelector(
  getSearch,
  search => search.searching,
);
