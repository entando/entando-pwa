import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class ErrorsAlert extends Component {
  componentDidUpdate(prevProps) {
    if (this.props.messageIds !== prevProps.messageIds && this.props.messageIds.length > 0) {
      this.props.onMessageIdsAdded(this.props.messageIds);
    }
  }

  render() {
    const { messages, onDismiss } = this.props;
    return (
      messages.length ?
        (
          <div className="ErrorsAlert">
            <Alert color="danger" toggle={onDismiss}>
            { 
              messages.length === 1 ? (
                <React.Fragment>
                  <FontAwesomeIcon icon="exclamation-circle" size="lg" />
                  <span className="ErrorsAlert__message">{messages[0]}</span>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <ul>
                    { messages.map(msg => <li key={msg}>{msg}</li>) }
                  </ul>
                </React.Fragment>
              )}
            </Alert>
          </div>
        ) :
        null
    );
  }
}

ErrorsAlert.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.string).isRequired,
  messageIds: PropTypes.arrayOf(PropTypes.object).isRequired,
  onDismiss: PropTypes.func.isRequired,
  onMessageIdsAdded: PropTypes.func.isRequired,
};

export default ErrorsAlert;
