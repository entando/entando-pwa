import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Navbar,
  Form,
  Row,
  Col,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class SearchBar extends Component
{
  render() {
    const { closeSearch } = this.props;

    return (
      <div className="topbar searchbar shadow-sm fixed-top">
        <Navbar expand="lg" light>
          <Form className="w-100">
            <Row>
              <Col xs={9} md={11}>
                <InputGroup>
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <FontAwesomeIcon icon="search" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input type="search" name="search" autoFocus />
                </InputGroup>
              </Col>
              <Col xs={3} md={1}>
                <span className="cancel cursor-pointer" onClick={closeSearch}>Annulla</span>
              </Col>
            </Row>
          </Form>
        </Navbar>
      </div>
    );
  }
}

SearchBar.propTypes = {
  closeSearch: PropTypes.func.isRequired,
};

export default SearchBar;
