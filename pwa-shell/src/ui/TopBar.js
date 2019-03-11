import { get } from 'lodash';
import React, { PureComponent } from 'react';
import { Link, withRouter } from 'react-router-dom';

class TopBar extends PureComponent {
  componentDidMount() {
    this.props.onFetchContentTypes();
  }

  render() {
    const { contentTypeList, selectedContentType, contentTypeMap, onSelectContentType } = this.props;
    return (
      <div className="topbar">
        <Link to={`/${contentTypeList[0]}`} onClick={() => onSelectContentType(contentTypeList[0])}>
          <img
            className="logo"
            src="/logo.svg"
            alt="logo"
          />
        </Link>
        {
          contentTypeList.length > 1 ? 
            <ul>
            {
              contentTypeList.map(contentType => (
                <li 
                  key={contentType}
                  className={`${contentType === selectedContentType ? 'contentType--selected' : ''}`}
                >
                    <Link className="" to={`/${contentType}`} onClick={() => onSelectContentType(contentType)}>
                      { get(contentTypeMap, `${contentType}.name`, contentType) }
                    </Link>
                </li>
              ))
            }
            </ul>
          : ''
        }
      </div>      
    );
  }  
}

export default withRouter(props => <TopBar {...props} />);
