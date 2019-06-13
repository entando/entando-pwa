import { get } from 'lodash';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withKeycloak } from 'react-keycloak';
import { getRequiresAuthMap, isUserLogged } from 'state/content/selectors';
import Login from 'ui/login/Login';

let mapStateToProps;
let ProtectedContentLoginContainer;

if (process.env.REACT_APP_AUTH_TYPE === 'keycloak') {
  mapStateToProps = (state, ownProps) => {
    const contentId = get(ownProps, 'match.params.id');
    return {
      hasAccess:
        !getRequiresAuthMap(state)[contentId] ||
        get(ownProps, 'keycloak.authenticated'),
      useKeycloak: true,
    };
  };
  ProtectedContentLoginContainer = withKeycloak(
    withRouter(
      connect(
        mapStateToProps,
        null,
      )(Login),
    ),
  );
} else {
  mapStateToProps = (state, ownProps) => {
    const contentId = get(ownProps, 'match.params.id');
    return {
      hasAccess: !getRequiresAuthMap(state)[contentId] || isUserLogged(state),
      useKeycloak: true,
    };
  };
  ProtectedContentLoginContainer = withRouter(
    connect(
      mapStateToProps,
      null,
    )(Login),
  );
}

export default ProtectedContentLoginContainer;
