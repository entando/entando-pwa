import React from 'react';
import { Link } from 'react-router-dom';
import { NavLink } from 'reactstrap';
import NavButton from 'ui/common/NavButton';

import TopBar from 'ui/common/TopBar';

const ContentDetailTopBar = () => {
  const leftItems = (
    <NavLink  
      tag={Link}
      to={'/content'}
    >
      <NavButton icon="arrow-left" />
    </NavLink>
  );
  return <TopBar leftItems={leftItems} />
};

export default ContentDetailTopBar;
