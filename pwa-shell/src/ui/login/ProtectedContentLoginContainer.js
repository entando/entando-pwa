import { get } from 'lodash';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withKeycloak } from 'react-keycloak';
import { getRequiresAuthMap, isUserLogged } from 'state/content/selectors';
import Login from 'ui/login/Login';

let mapStateToProps;
let ProtectedContentLoginContainer;

const useKeycloak = process.env.REACT_APP_AUTH_TYPE === 'keycloak';

if (useKeycloak) {
  mapStateToProps = (state, ownProps) => {
    const contentId = get(ownProps, 'match.params.id');
    return {
      hasAccess:
        !getRequiresAuthMap(state)[contentId] ||
        get(ownProps, 'keycloak.authenticated'),
      useKeycloak,
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
      useKeycloak,
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
