import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';

class ContentDetailTopBar extends PureComponent {
  render() {
    const { contentType } = this.props;
    return (
      <div className="topbar">
        <Link to={`/${contentType}`}>
          Back
        </Link>
      </div>      
    );
  }  
}

export default ContentDetailTopBar;
