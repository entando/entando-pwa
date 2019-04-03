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
  constructor() {
    super();

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.search(this.props.contentType, e.target.search.value);
  }

  render() {
    const { closeSearch, contentType } = this.props;

    console.log(contentType);

    return (
      <div className="topbar searchbar shadow-sm fixed-top">
        <Navbar expand="lg" light>
          <Form onSubmit={this.onSubmit} className="w-100">
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
                <span className="cancel cursor-pointer" onClick={() => closeSearch(contentType)}>Annulla</span>
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
  search: PropTypes.func.isRequired,
  contentType: PropTypes.string.isRequired,
};

export default SearchBar;
