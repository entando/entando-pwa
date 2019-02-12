import React, { PureComponent, PropTypes } from 'react';
import { Link, withRouter } from 'react-router-dom';

class TopBar extends PureComponent {
  componentDidMount() {
    this.props.onFetchContentTypes();
  }

  render() {
    const { contentTypeList, selectedContentType, onSelectContentType } = this.props;
    return (
      <div className="topbar">
        <Link to={`/${contentTypeList[0]}`} onClick={() => onSelectContentType(contentTypeList[0])}>
          <img
            className="logo"
            src="/logo.svg"
            alt="logo"
          />
        </Link>
        <ul>
          {
            contentTypeList.map(contentType => (
              <li 
                key={contentType}
                className={`channel ${contentType === selectedContentType ? 'contentType--selected' : ''}`}
              >
                  <Link className="" to={`/${contentType}`} onClick={() => onSelectContentType(contentType)}>{contentType}</Link>
              </li>
            ))
          }
        </ul>
      </div>      
    );
  }  
}

export default withRouter(props => <TopBar {...props} />);
