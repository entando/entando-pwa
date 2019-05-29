import { SET_LANGUAGE } from 'state/language/types';
import { defaultLanguageCode, languageCode } from 'state/appConfig';

const defaultState = {
  defaultCode: defaultLanguageCode,
  code: languageCode,
};

const reducer = (state = defaultState, action = {}) => {
  switch (action.type) {
    case SET_LANGUAGE:
      return {
        ...state,
        code: action.payload.code,
      };
    default:
      return state;
  }
};

export default reducer;
