import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FormattedMessage } from 'react-intl.macro';

class NetworkOfflineWarning extends Component {
  initialState = {
    visible: true,
  };
  state = this.initialState;

  closeWarning = () => {
    this.setState({ visible: false });
  };

  componentDidUpdate(prevProps) {
    if (this.props.isOffline !== prevProps.isOffline) {
      this.setState(this.initialState);
    }
  }

  render() {
    const { isOffline } = this.props;
    return this.state.visible && isOffline ? (
      <div className="NetworkOfflineWarning">
        <FontAwesomeIcon icon="exclamation-circle" size="lg" />
        <span className="NetworkOfflineWarning__text">
          <FormattedMessage
            id="network.offlineWarning"
            defaultMessage="No connection"
          />
        </span>
        <FontAwesomeIcon
          icon="times"
          size="lg"
          className="cursor-pointer"
          onClick={this.closeWarning}
        />
      </div>
    ) : (
      ''
    );
  }
}

export default NetworkOfflineWarning;
