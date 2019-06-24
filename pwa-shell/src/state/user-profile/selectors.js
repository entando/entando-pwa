import { get } from 'lodash';
import { createSelector } from 'reselect';
import { getUsername, getToken } from '@entando/apimanager';
import useKeycloak from 'auth/useKeycloak';

export const getUserProfile = state => state.userProfile;
export const getUserAuthType = createSelector(
  getUserProfile,
  profile => profile.authType,
);
export const getUserProfileAttributes = createSelector(
  getUserProfile,
  profile => get(profile, 'attributes', {}),
);
export const getUserFullname = createSelector(
  [getUserProfile, getUserProfileAttributes],
  (profile, attributes) => {
    if (useKeycloak) {
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
