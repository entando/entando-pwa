import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { NavLink } from 'reactstrap';
import NavButton from 'ui/common/NavButton';

import TopBar from 'ui/common/TopBar';

const NotificationsTopBar = ({ contentType, clearAllNotifications }) => {
  const leftItems = (
    <NavLink  
      tag={Link}
      to={contentType ? `/content/${contentType}` : '/'}
    >
      <NavButton icon="arrow-left" />
    </NavLink>
  );
  const rightItems = (
    <NavButton icon="check-double" onClick={clearAllNotifications} />
  );
  return (
    <TopBar
      contentType={contentType}
      leftItems={leftItems}
      rightItems={rightItems}
    />
  );
};

NotificationsTopBar.propTypes = {
  contentType: PropTypes.string,
  clearAllNotifications: PropTypes.func.isRequired,
};

NotificationsTopBar.defaultProps = {
  contentType: null,
};

export default NotificationsTopBar;
