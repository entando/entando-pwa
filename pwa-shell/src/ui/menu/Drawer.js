import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
      <div ref={this.setWrapperRef} className={`drawer vh-100 shadow ${state}`}>
        {this.props.children}
      </div>
    );
  }
}

Drawer.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeDrawer: PropTypes.func.isRequired,
};

export default Drawer;
