import { createSelector } from 'reselect';

export const getSearch = state => state.search;

export const isOpen = createSelector(
  getSearch,
  search => search.isOpen,
);
