import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { Link, withRouter } from 'react-router-dom';
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import DrawerContainer from 'ui/menu/DrawerContainer';
import logo from 'images/Logo_horizontal@2x.png';

class TopBar extends PureComponent {
  componentDidMount() {
    this.props.onFetchContentTypes();
  }

  render() {
    const {
      contentTypeList,
      selectedContentType,
      contentTypeMap,
      onSelectContentType,
      openDrawer,
    } = this.props;

    const links = contentTypeList.map(contentType => (
      <NavItem
        key={contentType}
        className={`${contentType === selectedContentType ? 'contentType--selected' : ''}`}
      >
          <NavLink tag={Link} to={`/${contentType}`} onClick={() => onSelectContentType(contentType)}>
            { get(contentTypeMap, `${contentType}.name`, contentType) }
          </NavLink>
      </NavItem>
    ));

    return (
      <div>
        <div className="topbar shadow-sm fixed-top">
          <Navbar expand="lg" light>
            <FontAwesomeIcon onClick={openDrawer} icon="bars" />
            <NavbarBrand
              tag={Link}
              to={`/${contentTypeList[0]}`}
              onClick={() => onSelectContentType(contentTypeList[0])}
              className="mx-auto"
              >
              <img
                className="logo"
                src={logo}
                alt="logo"
                />
            </NavbarBrand>

          </Navbar>
        </div>
        <DrawerContainer>
          <Navbar expand="lg" light>
            <Nav className="ml-auto" navbar>
              {links}
            </Nav>
          </Navbar>
        </DrawerContainer>
      </div>
    );
  }
}

TopBar.propTypes = {
  openDrawer: PropTypes.func.isRequired,
};

export default withRouter(props => <TopBar {...props} />);
