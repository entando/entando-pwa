import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  NETWORK_ONLINE_STATUS,
  NETWORK_OFFLINE_STATUS,
} from 'state/network/const';

class NetworkStatusProvider extends Component {
  handleStatusChange = status => {
    this.props.onStatusChange(status.type);
  };

  componentDidMount() {
    window.addEventListener(NETWORK_ONLINE_STATUS, this.handleStatusChange);
    window.addEventListener(NETWORK_OFFLINE_STATUS, this.handleStatusChange);
  }

  componentWillUnmount() {
    window.removeEventListener(NETWORK_ONLINE_STATUS, this.handleStatusChange);
    window.removeEventListener(NETWORK_OFFLINE_STATUS, this.handleStatusChange);
  }

  render() {
    const { children } = this.props;
    return <>{children}</>;
  }
}

NetworkStatusProvider.propTypes = {
  onStatusChange: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default NetworkStatusProvider;
