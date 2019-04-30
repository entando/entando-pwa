import { get } from 'lodash';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Container } from 'reactstrap';
import ProtectedContentLoginContainer from 'ui/login/ProtectedContentLoginContainer';
import ContentDetailTopBarContainer from 'ui/content-detail/ContentDetailTopBarContainer';
import PageContainer from 'ui/common/PageContainer';
import ItemCategoryListContainer from 'ui/common/ItemCategoryListContainer';

class ContentDetail extends PureComponent {
  componentDidMount() {
    this.props.fetchContentDetail();
  }

  componentDidUpdate(prevProps) {
    if (this.props.isUserLogged !== prevProps.isUserLogged) {
      this.props.fetchContentDetail();
    }
  }

  render() {
    const { contentDetail, isLoading, isUserLogged } = this.props;
    const loadingMessage = 'Caricamento...';
    const associatedCategoryIdList = get(contentDetail, 'categories', []);

    const contentDetailBody = !isLoading ? (
      <Container fluid>
        <ItemCategoryListContainer categoryIdList={associatedCategoryIdList} />
        <div dangerouslySetInnerHTML={{__html: get(contentDetail, 'html', '')}}></div>
      </Container>  
    ) : (
      <div className="mt-4">
        { loadingMessage }
      </div>
    );
        
    return (
      <PageContainer className={`ContentDetail${isUserLogged ? '' : '--guest-user'}`}>
        <ContentDetailTopBarContainer />
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
  fetchContentDetail: PropTypes.func.isRequired,
};

ContentDetail.defaultProps = {  
  contentDetail: null,
  contentType: null,
};

export default ContentDetail;
