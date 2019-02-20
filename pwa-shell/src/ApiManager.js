import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { config, setApi, useMocks } from '@entando/apimanager';
import { addToast, TOAST_WARNING } from '@entando/messages';

class ApiManager extends Component {
  constructor(props) {
    super(props);
    this.initApiManager(props);
  }

  initApiManager(props) {
    const { history, store } = props;    
    config(store, () => history.push('/'), () => history.push('/dashboard'));
    store.dispatch(setApi({
      domain: process.env.REACT_APP_DOMAIN,
      useMocks: process.env.REACT_APP_USE_MOCKS === 'true',
    }));
    
    if (useMocks(store.getState())) {
      store.dispatch(addToast(
        'This application is using mocks',
        TOAST_WARNING,
      ));
    } 
  }

  render() {
    return (
      <React.Fragment>
        { this.props.children }
      </React.Fragment>      
    );
  }  
}

export default withRouter(props => <ApiManager {...props} />);
