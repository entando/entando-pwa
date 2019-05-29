import { pickBy, uniqWith } from 'lodash';
import { createSelector } from 'reselect';
import { getToasts } from '@entando/messages';

export const getUniqueToasts = createSelector(
  getToasts,
  toasts => {
    const uniqueKeys = uniqWith(
      Object.keys(toasts),
      (current, other) => current.name === other.name,
    );
    const uniqueToasts = pickBy(toasts, (value, key) =>
      uniqueKeys.includes(key),
    );
    return uniqueToasts;
  },
);
