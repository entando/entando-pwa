import { get } from 'lodash';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Container } from 'reactstrap';
import ProtectedContentLoginContainer from 'ui/login/ProtectedContentLoginContainer';
import ContentDetailTopBar from 'ui/content-detail/ContentDetailTopBar';
import PageContainer from 'ui/common/PageContainer';

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
    const { contentDetail, contentType, isLoading, isUserLogged } = this.props;

    const loadingMessage = 'Caricamento...';

    const contentDetailBody = !isLoading ? (
      <Container fluid>
        <div dangerouslySetInnerHTML={{__html: get(contentDetail, 'html', '')}}></div>
      </Container>  
    ) : (
      <div className="mt-4">
        { loadingMessage }
      </div>
    );
        
    return (
      <PageContainer className={`ContentDetail${isUserLogged ? '' : '--guest-user'}`}>
        <ContentDetailTopBar contentType={contentType} />
        <ProtectedContentLoginContainer>
          <div className="ContentDetail__body">
            { contentDetailBody }
          </div>
        </ProtectedContentLoginContainer>
      </PageContainer>
    );
  }
}

ContentDetail.propTypes = {
  contentDetail: PropTypes.object,
  contentType: PropTypes.string,
  isLoading: PropTypes.bool.isRequired,
  fetchContentDetailAndMarkAsRead: PropTypes.func.isRequired,
};

ContentDetail.defaultProps = {  
  contentDetail: null,
  contentType: null,
};

export default ContentDetail;
