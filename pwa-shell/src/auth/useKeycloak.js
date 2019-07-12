import { get } from 'lodash';

const useKeycloak =
  get(process.env, 'REACT_APP_AUTH_TYPE', '').toUpperCase() === 'KEYCLOAK';

export default useKeycloak;
