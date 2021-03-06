import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { NavLink } from 'reactstrap';
import NavButton from 'ui/common/NavButton';

import TopBar from 'ui/common/TopBar';

const ContentDetailTopBar = ({ contentType }) => {
  const leftItems = (
    <NavLink  
      tag={Link}
      to={contentType ? `/content/${contentType}` : '/'}
    >
      <NavButton icon="arrow-left" />
    </NavLink>
  );
  return <TopBar contentType={contentType} leftItems={leftItems} />
};

ContentDetailTopBar.propTypes = {
  contentType: PropTypes.string,
};

ContentDetailTopBar.defaultProps = {
  contentType: null,
};

export default ContentDetailTopBar;
