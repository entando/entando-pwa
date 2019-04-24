import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import DrawerContainer from 'ui/menu/DrawerContainer';
import SearchBarContainer from 'ui/menu/SearchBarContainer';
import CategoryFilterContainer from 'ui/menu/CategoryFilterContainer';
import TopBar from 'ui/common/TopBar';
import NavButton from 'ui/common/NavButton';
import ContentTypeFilterContainer from 'ui/menu/ContentTypeFilterContainer';

const notificationsRoute = '/notifications';

class ContentListTopBar extends PureComponent {
  componentDidMount() {
    this.props.onFetchNotifications();
  }

  render() {
    const {
      selectedContentType,
      notificationAmount,
      openDrawer,
      openSearch,
      isSearchOpen,
      isUserLogged
    } = this.props;

    if (isSearchOpen) {
      return <SearchBarContainer />;
    }

    const notificationsButton = isUserLogged ? (
      <Link to={notificationsRoute}>
        <NavButton icon="bell" className="mr-4" badgeText={notificationAmount} />
      </Link>
    ) : '';

    const leftItems = (
      <NavButton icon="bars" onClick={openDrawer} />      
    );

    const rightItems = [
      notificationsButton,
      (<NavButton icon="search" onClick={openSearch} />),
    ];

    return (
      <Fragment>
        <TopBar
          leftItems={leftItems}
          rightItems={rightItems}
        />
        <DrawerContainer>
          <ContentTypeFilterContainer />
          <CategoryFilterContainer contentType={selectedContentType} />
        </DrawerContainer>
      </Fragment>
    );
  }
}

ContentListTopBar.propTypes = {
  selectedContentType: PropTypes.string,
  onFetchNotifications: PropTypes.func.isRequired,
  onSelectContentType: PropTypes.func.isRequired,
  openDrawer: PropTypes.func.isRequired,
  openSearch: PropTypes.func.isRequired,
  isSearchOpen: PropTypes.bool.isRequired,
  isUserLogged: PropTypes.bool.isRequired,
};

export default ContentListTopBar;
