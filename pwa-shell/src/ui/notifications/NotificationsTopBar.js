import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { NavLink } from 'reactstrap';
import NavButton from 'ui/common/NavButton';

import TopBar from 'ui/common/TopBar';

const NotificationsTopBar = ({ clearAllNotifications }) => {
  const leftItems = (
    <NavLink  
      tag={Link}
      to={'/content'}
    >
      <NavButton icon="arrow-left" />
    </NavLink>
  );
  const rightItems = (
    <NavButton icon="check-double" onClick={clearAllNotifications} />
  );
  return (
    <TopBar
      leftItems={leftItems}
      rightItems={rightItems}
    />
  );
};

NotificationsTopBar.propTypes = {
  clearAllNotifications: PropTypes.func.isRequired,
};

export default NotificationsTopBar;
