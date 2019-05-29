import { createSelector } from 'reselect';

export const getLanguageState = state => state.language;

export const getLanguageCode = createSelector(
  getLanguageState,
  lang => lang.code,
);

export const getDefaultLanguageCode = createSelector(
  getLanguageState,
  lang => lang.defaultCode,
);
