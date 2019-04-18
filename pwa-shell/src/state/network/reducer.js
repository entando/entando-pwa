import { SET_STATUS } from 'state/network/types';
import { NETWORK_ONLINE_STATUS, NETWORK_OFFLINE_STATUS } from 'state/network/const';

const defaultState = {
  status: navigator.onLine ? NETWORK_ONLINE_STATUS : NETWORK_OFFLINE_STATUS,
};

const reducer = (state = defaultState, action = {}) => {
  switch (action.type) {
    case SET_STATUS:
      return {
        ...state,
        status: action.payload,
      }
    default:
      return state;
  }
};

export default reducer;
