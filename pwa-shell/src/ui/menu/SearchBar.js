import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Navbar, Input, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class SearchBar extends Component
{
  render() {
    const { closeSearch } = this.props;

    return (
      <div className="topbar searchbar shadow-sm fixed-top">
        <Navbar expand="lg" light>
          <InputGroup>
            <InputGroupAddon addonType="prepend">
              <InputGroupText>
                <FontAwesomeIcon icon="search" />
              </InputGroupText>
            </InputGroupAddon>
            <Input type="search" name="search" autoFocus />
          </InputGroup>
          <span className="ml-3 cursor-pointer" onClick={closeSearch}>Annulla</span>
        </Navbar>
      </div>
    );
  }
}

SearchBar.propTypes = {
  closeSearch: PropTypes.func.isRequired,
};

export default SearchBar;
