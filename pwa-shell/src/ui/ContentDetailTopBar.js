import React, { PureComponent } from 'react';
import { Link, withRouter } from 'react-router-dom';

class ContentDetailTopBar extends PureComponent {
  render() {
    const { selectedContentType } = this.props;
    return (
      <div className="topbar">
        <Link to={`/${selectedContentType}`}>
          Back
        </Link>
      </div>      
    );
  }  
}

export default withRouter(props => <ContentDetailTopBar {...props} />);
