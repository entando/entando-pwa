import { get } from 'lodash';
import { createSelector } from 'reselect';
import { getUsername, getToken } from '@entando/apimanager';

export const getUserProfile = state => state.userProfile;
export const getUserAuthType = createSelector(
  getUserProfile,
  profile => profile.authType,
);
export const isAuthTypeKeycloak = createSelector(
  getUserAuthType,
  authType => authType === 'keycloak',
);
export const getUserProfileAttributes = createSelector(
  getUserProfile,
  profile => get(profile, 'attributes', {}),
);
export const getUserFullname = createSelector(
  [isAuthTypeKeycloak, getUserProfile, getUserProfileAttributes],
  (authKeycloak, profile, attributes) => {
    if (authKeycloak) {
      return profile.name;
    } else {
      const fullnameobj = attributes.find(attr => attr.code === 'fullname');
      return fullnameobj && fullnameobj.value ? fullnameobj.value : '';
    }
  },
);

export const isUserLogged = createSelector(
  [getUsername, getToken],
  (username, token) => !!username && !!token,
);
