import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavItem, NavLink } from 'reactstrap';

import DrawerContainer from 'ui/menu/DrawerContainer';
import SearchBarContainer from 'ui/menu/SearchBarContainer';
import CategoryFilterContainer from 'ui/menu/CategoryFilterContainer';
import TopBar from 'ui/common/TopBar';
import NavButton from 'ui/common/NavButton';

const notificationsRoute = '/notifications';

class ContentListTopBar extends PureComponent {
  componentDidMount() {
    this.props.fetchContentTypes();
    if (this.props.isUserLogged) {
      this.props.fetchNotifications();
    }
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
      isUserLogged,
    } = this.props;

    const contentTypeLinks =
      contentTypeList.length > 1
        ? contentTypeList.map(contentType => (
            <NavItem
              key={contentType}
              className={`${
                contentType === selectedContentType
                  ? 'contentType--selected'
                  : ''
              }`}
            >
              <NavLink
                tag={Link}
                to={`/content/${contentType}`}
                onClick={() => onSelectContentType(contentType)}
              >
                {get(contentTypeMap, `${contentType}.name`, contentType)}
              </NavLink>
            </NavItem>
          ))
        : '';

    if (isSearchOpen) {
      return <SearchBarContainer />;
    }

    const notificationsButton = isUserLogged ? (
      <Link to={notificationsRoute}>
        <NavButton
          icon="bell"
          className="mr-4"
          badgeText={notificationAmount}
        />
      </Link>
    ) : (
      ''
    );

    const leftItems = <NavButton icon="bars" onClick={openDrawer} />;

    const rightItems = [
      notificationsButton,
      <NavButton icon="search" onClick={openSearch} />,
    ];

    return (
      <Fragment>
        <TopBar
          contentType={selectedContentType}
          leftItems={leftItems}
          rightItems={rightItems}
        />
        <DrawerContainer>
          <Navbar light>
            <Nav className="ml-auto" navbar>
              {contentTypeLinks}
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
  fetchContentTypes: PropTypes.func.isRequired,
  fetchNotifications: PropTypes.func.isRequired,
  isSearchOpen: PropTypes.bool.isRequired,
  isUserLogged: PropTypes.bool.isRequired,
};

export default ContentListTopBar;
