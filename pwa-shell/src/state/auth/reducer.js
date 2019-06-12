const initialState = {
  type: process.env.REACT_APP_AUTH_TYPE,
  config: {
    url: process.env.REACT_APP_KEYCLOAK_URL,
    realm: process.env.REACT_APP_KEYCLOAK_REALM,
    clientId: process.env.REACT_APP_KEYCLOAK_CLIENT_ID,
  },
};

export default (state = initialState, action) => state;
