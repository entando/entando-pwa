import React from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ErrorsAlert = ({ messages, onDismiss }) => (
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

ErrorsAlert.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.string).isRequired,
  onDismiss: PropTypes.func.isRequired,
};

export default ErrorsAlert;
