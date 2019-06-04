import { createSelector } from 'reselect';

export const getUserProfile = state => state.userProfile;
export const getUserProfileAttributes = createSelector(
  getUserProfile,
  profile => profile.attributes,
);
export const getUserFullname = createSelector(
  getUserProfileAttributes,
  attributes => {
    const fullnameobj = attributes.find(attr => attr.code === 'fullname');
    return fullnameobj && fullnameobj.value ? fullnameobj.value : '';
  },
);
