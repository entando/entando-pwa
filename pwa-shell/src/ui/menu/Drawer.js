import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Gesture } from 'react-with-gesture';

import { ReactComponent as Close } from 'images/icons/ic_close.svg';
import LogoutContainer from 'ui/menu/LogoutContainer';

class Drawer extends Component {
  constructor(props) {
    super(props);

    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.handleTouchEnd = this.handleTouchEnd.bind(this);
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

  handleTouchEnd(event) {
    if (event.velocity >= 0.15 && event.delta[0] < 0) this.props.closeDrawer();
  }

  render() {
    const { isOpen } = this.props;
    const drawerState = isOpen ? 'open' : 'closed';
    const config = { event: { passive: false } };
    return (
      <>
        <div className={`grey-overlay ${drawerState}`} />
        <Gesture {...config} onUp={this.handleTouchEnd}>
          {event => {
            const { down, delta } = event;
            return (
              <div
                ref={this.setWrapperRef}
                className={`drawer vh-100 shadow ${drawerState}`}
                style={
                  isOpen && down && delta[0] < 0
                    ? { transition: 'none', left: delta[0] }
                    : {}
                }
              >
                <div className="p-2">
                  <Close
                    onClick={this.props.closeDrawer}
                    className="cursor-pointer color-primary-lightest float-right"
                  />
                </div>
                <LogoutContainer />
                {this.props.children}
              </div>
            );
          }}
        </Gesture>
      </>
    );
  }
}

Drawer.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeDrawer: PropTypes.func.isRequired,
};

export default Drawer;
