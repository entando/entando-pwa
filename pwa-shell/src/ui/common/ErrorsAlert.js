import { isString } from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'reactstrap';
import { FormattedMessage } from 'react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const toMessageDescriptor = message =>
  isString(message) ? { id: message } : message;

const ErrorsAlert = ({ messages, onDismiss }) =>
  messages.length ? (
    <div className="ErrorsAlert">
      <Alert color="danger" toggle={onDismiss}>
        {messages.length === 1 ? (
          <>
            <FontAwesomeIcon icon="exclamation-circle" size="lg" />
            <span className="ErrorsAlert__message">
              <FormattedMessage {...toMessageDescriptor(messages[0])} />
            </span>
          </>
        ) : (
          <>
            <ul>
              {messages.map(msg => (
                <li key={msg}>
                  <FormattedMessage {...toMessageDescriptor(msg)} />
                </li>
              ))}
            </ul>
          </>
        )}
      </Alert>
    </div>
  ) : null;

ErrorsAlert.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        id: PropTypes.string,
        defaultMessage: PropTypes.string,
      }),
    ]),
  ).isRequired,
  onDismiss: PropTypes.func.isRequired,
};

export default ErrorsAlert;
