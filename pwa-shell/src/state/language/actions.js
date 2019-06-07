import { SET_LANGUAGE } from 'state/language/types';

export const setLanguage = code => ({
  type: SET_LANGUAGE,
  payload: { code },
});
