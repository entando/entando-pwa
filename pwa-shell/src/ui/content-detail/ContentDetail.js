import { get } from 'lodash';
import React, { PureComponent } from 'react';
import ProtectedContentLoginContainer from 'ui/login/ProtectedContentLoginContainer';
import ContentDetailBody from 'ui/content-detail/ContentDetailBody';
import ContentDetailTopBar from 'ui/content-detail/ContentDetailTopBar';

class ContentDetail extends PureComponent {
  componentDidMount() {
    this.props.fetchContentDetailAndMarkAsRead();
  }

  componentDidUpdate(prevProps) {
    if (this.props.isUserLogged !== prevProps.isUserLogged) {
      this.props.fetchContentDetailAndMarkAsRead();
    }
  }

  render() {
    const { contentDetail } = this.props;
    const contentType = get(contentDetail, 'typeCode');
    return (
      <React.Fragment>
        <ContentDetailTopBar contentType={contentType} />
        <ProtectedContentLoginContainer>
          <ContentDetailBody contentDetail={contentDetail} />
        </ProtectedContentLoginContainer>
      </React.Fragment>
    );
  }
}

export default ContentDetail;
