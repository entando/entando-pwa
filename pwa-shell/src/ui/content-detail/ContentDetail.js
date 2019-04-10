import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
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
    const { contentDetail, contentType } = this.props;
    return (
      <Fragment>
        <ContentDetailTopBar contentType={contentType} />
        <ProtectedContentLoginContainer>
          <ContentDetailBody contentDetail={contentDetail} />
        </ProtectedContentLoginContainer>
      </Fragment>
    );
  }
}

ContentDetail.propTypes = {
  contentDetail: PropTypes.object,
  contentType: PropTypes.string.isRequired,
  fetchContentDetailAndMarkAsRead: PropTypes.func.isRequired,
};

ContentDetail.defaultProps = {  
  contentDetail: null,
};

export default ContentDetail;
