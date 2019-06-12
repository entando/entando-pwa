import { get } from 'lodash';
import { connect } from 'react-redux';
import { withKeycloak } from 'react-keycloak';
import {
  isSelectedContentAvailable,
  doesSelectedContentRequireAuth,
} from 'state/content/selectors';
import Login from 'ui/login/Login';

let mapStateToProps;
let ProtectedContentLoginContainer;

if (process.env.REACT_APP_AUTH_TYPE === 'keycloak') {
  mapStateToProps = (state, ownProps) => ({
    hasAccess:
      !doesSelectedContentRequireAuth(state) ||
      get(ownProps, 'keycloak.authenticated', false),
    useKeycloak: true,
  });
  ProtectedContentLoginContainer = withKeycloak(
    connect(
      mapStateToProps,
      null,
    )(Login),
  );
} else {
  mapStateToProps = state => ({
    hasAccess: isSelectedContentAvailable(state),
    useKeycloak: false,
  });
  ProtectedContentLoginContainer = connect(
    mapStateToProps,
    null,
  )(Login);
}

export default ProtectedContentLoginContainer;
