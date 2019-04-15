import {
  SET_STATUS,
} from 'state/network/types';

export const setStatus = status => ({
  type: SET_STATUS,
  payload: status,
});
