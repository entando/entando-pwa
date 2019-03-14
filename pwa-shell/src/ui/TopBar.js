import { get } from 'lodash';
import React, { PureComponent } from 'react';
import { Link, withRouter } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';

import logo from 'images/Logo_horizontal@2x.png';

class TopBar extends PureComponent {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }

  componentDidMount() {
    this.props.onFetchContentTypes();
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    const { contentTypeList, selectedContentType, contentTypeMap, onSelectContentType } = this.props;

    const links = contentTypeList.map(contentType => (
      <NavItem
        key={contentType}
        className={`${contentType === selectedContentType ? 'contentType--selected' : ''}`}
      >
          <NavLink tag={Link} to={`/${contentType}`} onClick={() => onSelectContentType(contentType)}>
            { get(contentTypeMap, `${contentType}.name`, contentType) }
          </NavLink>
      </NavItem>
    ));

    return (
      <div className="topbar shadow-sm fixed-top">
        <Navbar expand="lg" light>
          <NavbarToggler onClick={this.toggle} />
          <NavbarBrand
            tag={Link}
            to={`/${contentTypeList[0]}`}
            onClick={() => onSelectContentType(contentTypeList[0])}
            className="mx-auto"
          >
            <img
              className="logo"
              src={logo}
              alt="logo"
            />
          </NavbarBrand>
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              {links}
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default withRouter(props => <TopBar {...props} />);
