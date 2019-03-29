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

import DrawerContainer from 'ui/menu/DrawerContainer';
import SearchBarContainer from 'ui/menu/SearchBarContainer';
import logo from 'images/Logo_horizontal@2x.png';
import CategoryFilterContainer from 'ui/CategoryFilterContainer';
import NavButton from 'ui/common/NavButton';

const notificationsRoute = '/notifications';
const mockNotificationBadgeText = '2';
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
      openSearch,
      isSearchOpen,
    } = this.props;

    const links = contentTypeList.length > 1 ? contentTypeList.map(contentType => (
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

    return (
      <div>
        <div className="topbar shadow-sm fixed-top">
          <Navbar expand="lg" light>
            <NavButton icon="bars" className="mr-3" onClick={openDrawer} />
            <NavbarBrand
              tag={Link}
              to={`/content/${contentTypeList[0]}`}
              onClick={() => onSelectContentType(contentTypeList[0])}
              className="mx-auto"
              >
              <img
                className="logo"
                src={logo}
                alt="logo"
                />
            </NavbarBrand>
            <div>
              <Link to={notificationsRoute}>
                <NavButton icon="bell" className="mr-4" badgeText={mockNotificationBadgeText} />
              </Link>
              <NavButton icon="search" onClick={openSearch} />
            </div>
          </Navbar>
        </div>
        <DrawerContainer>
          <Navbar expand="lg" light>
            <Nav className="ml-auto" navbar>
              {links}
            </Nav>
          </Navbar>          
          <CategoryFilterContainer contentType={selectedContentType} />
        </DrawerContainer>
      </div>
    );
  }
}

TopBar.propTypes = {
  contentTypeList: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedContentType: PropTypes.string,
  contentTypeMap: PropTypes.object.isRequired,
  onSelectContentType: PropTypes.func.isRequired,
  openDrawer: PropTypes.func.isRequired,
  openSearch: PropTypes.func.isRequired,
  isSearchOpen: PropTypes.bool.isRequired,
};

export default withRouter(props => <TopBar {...props} />);
