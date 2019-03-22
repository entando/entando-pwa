import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import { ReactComponent as Close } from 'images/icons/ic_close.svg';

class Drawer extends Component
{
  constructor(props) {
    super(props);

    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    if (this.props.isOpen) {
      document.addEventListener('mousedown', this.handleClickOutside);
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.isOpen !== this.props.isOpen) {
      if (this.props.isOpen) {
        document.addEventListener('mousedown', this.handleClickOutside);
      } else {
        document.removeEventListener('mousedown', this.handleClickOutside);
      }
    }
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.props.closeDrawer();
    }
  }

  render() {
    const state = this.props.isOpen ? 'open' : 'closed';

    return (
      <Fragment>
        <div className={`grey-overlay ${state}`}></div>
        <div ref={this.setWrapperRef} className={`drawer vh-100 shadow ${state}`}>
          <div className="p-2">
            <Close onClick={this.props.closeDrawer} className="cursor-pointer color-primary-lightest float-right" />
          </div>
          {this.props.children}
        </div>
      </Fragment>
    );
  }
}

Drawer.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeDrawer: PropTypes.func.isRequired,
};

export default Drawer;
