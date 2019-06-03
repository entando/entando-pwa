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
import { FormattedMessage } from 'react-intl.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class SearchBar extends Component {
  state = {
    searchTerm: '',
  };

  constructor() {
    super();
    this.onSubmit = this.onSubmit.bind(this);
    this.onSearchValueChange = this.onSearchValueChange.bind(this);
  }

  componentDidMount() {
    this.onSearchValueChange(this.props.searchTerm || '');
  }

  onSearchValueChange(searchTerm) {
    this.setState({ searchTerm });
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.search(this.props.contentType, e.target.search.value);
  }

  render() {
    const { closeSearch, contentType } = this.props;

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
                  <Input
                    type="search"
                    name="search"
                    value={this.state.searchTerm}
                    onChange={e => this.onSearchValueChange(e.target.value)}
                    autoFocus
                  />
                </InputGroup>
              </Col>
              <Col xs={3} md={1}>
                <span
                  className="cancel cursor-pointer"
                  onClick={() => closeSearch(contentType)}
                >
                  <FormattedMessage
                    id="search.cancelLabel"
                    defaultMessage="Cancel"
                  />
                </span>
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
  contentType: PropTypes.string,
  searchTerm: PropTypes.string,
};

SearchBar.defaultProps = {
  contentType: '',
  searchTerm: '',
};

export default SearchBar;
