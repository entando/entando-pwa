import { isEmpty, uniqueId } from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Navbar, NavbarBrand, Nav, NavItem } from 'reactstrap';

import logo from 'images/Logo_horizontal@2x.png';

const wrapNavItems = items =>
  isEmpty(items) ? null : Array.isArray(items) ? (
    items.map((item, index) => <NavItem key={uniqueId('nav-')}>{item}</NavItem>)
  ) : (
    <NavItem>{items}</NavItem>
  );

const TopBar = ({ contentType, leftItems, rightItems }) => {
  const leftItemsMarkup = wrapNavItems(leftItems);
  const rightItemsMarkup = wrapNavItems(rightItems);
  return (
    <div className="topbar shadow-sm fixed-top">
      <Navbar dark>
        <Nav className="nav-left">{leftItemsMarkup}</Nav>
        <NavbarBrand
          tag={Link}
          to={contentType ? `/content/${contentType}` : '/'}
          className="brand mx-auto"
        >
          <img className="logo" src={logo} alt="logo" />
        </NavbarBrand>
        <Nav className="nav-right">{rightItemsMarkup}</Nav>
      </Navbar>
    </div>
  );
};

TopBar.propTypes = {
  contentType: PropTypes.string,
  leftItems: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  rightItems: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

TopBar.defaultProps = {
  contentType: null,
  leftItems: null,
  rightItems: null,
};

export default TopBar;
