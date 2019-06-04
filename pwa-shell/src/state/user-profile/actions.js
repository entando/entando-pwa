import { SET_USER_PROFILE } from 'state/user-profile/types';

export const setUserProfile = profile => ({
  type: SET_USER_PROFILE,
  payload: {
    profile,
  },
});
