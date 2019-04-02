import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const NavButton = ({ icon, badgeText, className, onClick }) => (
  <span className={`NavButton ${className}`}>
    <FontAwesomeIcon onClick={onClick} className="cursor-pointer" icon={icon} size="lg" />
    { 
      badgeText ? (
        <sup>
          <span className="NavButton__Badge">{badgeText}</span>
        </sup>
      ) : ''
    }
  </span>
);

NavButton.propTypes = {
  icon: PropTypes.string.isRequired,
  badgeText: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  className: PropTypes.string,
  onClick: PropTypes.func,
};

NavButton.defaultProps = {  
  badgeText: '',
  className: '',
};

export default NavButton;
