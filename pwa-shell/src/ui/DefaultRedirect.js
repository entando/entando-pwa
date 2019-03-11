import React, { PureComponent } from 'react';
import { Redirect } from 'react-router-dom';

class DefaultRedirect extends PureComponent {
  render() {
    const { defaultContentTypeCode } = this.props;
    return <Redirect to={defaultContentTypeCode || ''} />
  }
}

export default DefaultRedirect;
