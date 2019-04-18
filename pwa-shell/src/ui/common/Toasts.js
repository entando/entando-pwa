import React from 'react';
import PropTypes from 'prop-types';
import { Toast, ToastHeader, ToastBody } from 'reactstrap';

const Toasts = ({ toasts, onDismiss }) => {
  const notifications = Object.keys(toasts).reverse().map(key => {
    const dismiss = () => onDismiss(key);
    setTimeout(dismiss, 10000);
    return (
      <Toast
        key={key}
        className={`Toast Toast--${toasts[key].type}`}
      >
        <ToastHeader toggle={dismiss}>InfoEI</ToastHeader>
        <ToastBody>
          {toasts[key].message}
        </ToastBody>
      </Toast>
      );
  });

  return (
    <div className="Toasts">
      {notifications}
    </div>
  );
};

Toasts.propTypes = {
  toasts: PropTypes.shape({}),
  onDismiss: PropTypes.func.isRequired,
};

Toasts.defaultProps = {
  toasts: {},
};

export default Toasts;
