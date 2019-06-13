import { makeRequest, METHODS } from '@entando/apimanager';
import { USER_PROFILE } from 'mocks/userProfile';

export const getUserProfile = username =>
  makeRequest({
    uri: `/api/userProfiles/${username}`,
    method: METHODS.GET,
    mockResponse: USER_PROFILE,
    useAuthentication: true,
  });
