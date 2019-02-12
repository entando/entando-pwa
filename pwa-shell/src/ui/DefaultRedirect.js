import React, { PureComponent } from 'react';
import { Redirect } from 'react-router-dom';

class DefaultRedirect extends PureComponent {
  componentDidMount() {
    this.props.onFetchContentTypeList();
  }

  render() {
    const { defaultContentType } = this.props;
    return <Redirect to={defaultContentType || ''} />
  }
}

export default DefaultRedirect;
