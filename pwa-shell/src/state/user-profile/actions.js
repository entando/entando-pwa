import { SET_USER_PROFILE } from 'state/user-profile/types';

export const setUserProfile = profile => ({
  type: SET_USER_PROFILE,
  payload: {
    profile,
  },
});

// TODO: remove unsetUser and add logoutUserWithoutRedirect to apiManager actions
const unsetUser = () => ({
  type: 'current-user/unset-user',
  payload: {
    user: {
      username: null,
      token: null,
      tokenRefresh: null,
    },
  },
});

export const logoutUserWithoutRedirect = () => dispatch => {
  dispatch(unsetUser());

  localStorage.removeItem('username');
  localStorage.removeItem('token');
  localStorage.removeItem('tokenRefresh');
};
//
