import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { Link } from 'react-router-dom';
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';

import DrawerContainer from 'ui/menu/DrawerContainer';
import SearchBarContainer from 'ui/menu/SearchBarContainer';
import logo from 'images/Logo_horizontal@2x.png';
import CategoryFilterContainer from 'ui/menu/CategoryFilterContainer';
import NavButton from 'ui/common/NavButton';

const notificationsRoute = '/notifications';

class ContentListTopBar extends PureComponent {
  componentDidMount() {
    this.props.onFetchContentTypes();
    this.props.onFetchNotifications();
  }

  render() {
    const {
      contentTypeList,
      selectedContentType,
      contentTypeMap,
      notificationAmount,
      onSelectContentType,
      openDrawer,
      openSearch,
      isSearchOpen,
      isUserLogged
    } = this.props;

    const contentTypeLinks = contentTypeList.length > 1 ? contentTypeList.map(contentType => (
      <NavItem
        key={contentType}
        className={`${contentType === selectedContentType ? 'contentType--selected' : ''}`}
      >
          <NavLink tag={Link} to={`/${contentType}`} onClick={() => onSelectContentType(contentType)}>
            { get(contentTypeMap, `${contentType}.name`, contentType) }
          </NavLink>
      </NavItem>
    ))       
    : '';

    if (isSearchOpen) {
      return <SearchBarContainer />;
    }

    const notificationsButton = isUserLogged ? (
      <Link to={notificationsRoute}>
        <NavButton icon="bell" className="mr-4" badgeText={notificationAmount} />
      </Link>
    ) : '';

    return (
      <Fragment>
        <div className="topbar shadow-sm fixed-top">
          <Navbar light>     
            <Nav>
              <NavItem>
                <NavButton icon="bars" onClick={openDrawer} />
              </NavItem>
            </Nav>                   
            <NavbarBrand
              tag={Link}
              to={`/content/${selectedContentType}`}
              className="mx-auto"
            >
              <img
                className="logo"
                src={logo}
                alt="logo"
              />
            </NavbarBrand>
            <Nav className="nav-right">
              <NavItem>{ notificationsButton }</NavItem>
              <NavItem><NavButton icon="search" onClick={openSearch} /></NavItem>
            </Nav>
          </Navbar>
        </div>
        <DrawerContainer>
          <Navbar light>
            <Nav className="ml-auto" navbar>
              { contentTypeLinks }
            </Nav>
          </Navbar>          
          <CategoryFilterContainer contentType={selectedContentType} />
        </DrawerContainer>
      </Fragment>
    );
  }
}

ContentListTopBar.propTypes = {
  contentTypeList: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedContentType: PropTypes.string,
  contentTypeMap: PropTypes.object.isRequired,
  onSelectContentType: PropTypes.func.isRequired,
  openDrawer: PropTypes.func.isRequired,
  openSearch: PropTypes.func.isRequired,
  isSearchOpen: PropTypes.bool.isRequired,
  isUserLogged: PropTypes.bool.isRequired,
};

export default ContentListTopBar;
