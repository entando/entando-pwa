import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input as BootstrapInput } from 'reactstrap';

class Input extends Component
{
  render() {
    const {
      input,
      placeholder,
      type,
    } = this.props;

    return (
      <BootstrapInput
        {...input}
        type={type}
        id={input.name}
        placeholder={placeholder}
      />
    );
  }
}

Input.propTypes = {
  input: PropTypes.shape({}),
  placeholder: PropTypes.string,
  type: PropTypes.string,
};

Input.defaultProps = {
  input: {},
  placeholder: '',
  type: 'text',
};

export default Input;
