import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FormattedMessage } from 'react-intl.macro';

class NetworkOfflineWarning extends Component {
  state = {
    visible: true,
  };

  closeWarning = () => {
    this.setState({ visible: false });
  }
  
  render() {
    return this.state.visible ? (
      <div className="NetworkOfflineWarning">
        <FontAwesomeIcon icon="exclamation-circle" size="lg" />
        <span className="NetworkOfflineWarning__text">
          <FormattedMessage id="network.offlineWarning" defaultMessage="No connection" />
        </span>
        <FontAwesomeIcon
          icon="times"
          size="lg"
          className="cursor-pointer"
          onClick={this.closeWarning}
        />
      </div>
    ) : '';
  }
}

export default NetworkOfflineWarning;
