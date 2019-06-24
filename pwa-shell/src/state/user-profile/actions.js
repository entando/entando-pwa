import { SET_USER_PROFILE } from 'state/user-profile/types';
import { SET_USER_AUTH_TYPE } from 'state/user-profile/types';

export const setUserProfile = profile => ({
  type: SET_USER_PROFILE,
  payload: {
    profile,
  },
});

export const setKeycloakAuthType = () => ({
  type: SET_USER_AUTH_TYPE,
  payload: {
    authType: 'keycloak',
  },
});

export const setDefaultAuthType = () => ({
  type: SET_USER_AUTH_TYPE,
  payload: {
    authType: 'default',
  },
});
