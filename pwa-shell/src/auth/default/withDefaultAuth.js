import React from 'react';
import DefaultAuthContext from 'auth/default/DefaultAuthContext';
import useKeycloak from 'auth/useKeycloak';

const withDefaultAuth = WrappedComponent => {
  const Context = DefaultAuthContext;
  return class ComponentWithDefaultAuth extends React.Component {
    renderWrappedComponent = ({ authInitialized, auth }) => (
      <WrappedComponent
        {...this.props}
        authInitialized={authInitialized}
        useKeycloak={useKeycloak}
        auth={auth}
      />
    );

    render() {
      return <Context.Consumer>{this.renderWrappedComponent}</Context.Consumer>;
    }
  };
};

export default withDefaultAuth;
