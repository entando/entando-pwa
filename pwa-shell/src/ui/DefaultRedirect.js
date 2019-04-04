import React, { PureComponent } from 'react';
import { Redirect } from 'react-router-dom';

class DefaultRedirect extends PureComponent {
  render() {
    const { defaultContentTypeCode } = this.props;
    const path = defaultContentTypeCode ? `/content/${defaultContentTypeCode}` : '';
    return <Redirect to={path} />
  }
}

export default DefaultRedirect;
