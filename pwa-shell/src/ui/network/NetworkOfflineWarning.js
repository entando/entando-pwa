import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
        <span className="NetworkOfflineWarning__text">Nessuna connessione</span>
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
