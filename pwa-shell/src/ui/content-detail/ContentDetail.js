import { get } from 'lodash';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Container } from 'reactstrap';
import ProtectedContentLoginContainer from 'ui/login/ProtectedContentLoginContainer';
import ContentDetailTopBarContainer from 'ui/content-detail/ContentDetailTopBarContainer';
import Page from 'ui/common/Page';
import SwipeContentNavigator from 'ui/common/SwipeContentNavigator';
import ItemCategoryListContainer from 'ui/common/ItemCategoryListContainer';

class ContentDetail extends PureComponent {
  state = {
    nextURL: '',
    previousURL: '',
  }

  fetchDetail() {
    const { location, match } = this.props;
    this.props.fetchContentDetail(location, match.params);
  }

  componentDidMount() {
    this.fetchDetail();
  }

  componentDidUpdate(prevProps) {
    if (this.props.isUserLogged !== prevProps.isUserLogged || this.props.match.params !== prevProps.match.params) {
      this.fetchDetail();
    } else if (this.props.nextContent !== prevProps.nextContent || this.props.prevContent !== prevProps.prevContent) {
      this.checkContentSiblings();
    }
  }

  checkContentSiblings() {
    const {
      nextContent,
      prevContent,
      contentType,
    } = this.props;

    const hasNext = Object.keys(nextContent).length > 0;
    const hasPrev = Object.keys(prevContent).length > 0;
    this.setState({
      nextURL: hasNext ? `/content/${contentType}/${nextContent.id}${nextContent.requiresAuth ? '?requiresAuth=true' : ''}` : '',
      previousURL: hasPrev ? `/content/${contentType}/${prevContent.id}${prevContent.requiresAuth ? '?requiresAuth=true' : ''}` : '',
    });
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
      <Page
        className={`ContentDetail${isUserLogged ? '' : '--guest-user'}`}
        header={<ContentDetailTopBarContainer />}
      > 
        <ProtectedContentLoginContainer>
          <SwipeContentNavigator nextURL={this.state.nextURL} previousURL={this.state.previousURL}>
            <div className="ContentDetail__body">
              { contentDetailBody }
            </div>
          </SwipeContentNavigator>
        </ProtectedContentLoginContainer>
      </Page>
    );
  }
}

ContentDetail.propTypes = {
  contentDetail: PropTypes.object,
  contentType: PropTypes.string,
  isLoading: PropTypes.bool.isRequired,
  fetchContentDetail: PropTypes.func.isRequired,
  prevContent: PropTypes.object,
  nextContent: PropTypes.object,
};

ContentDetail.defaultProps = {  
  contentDetail: null,
  contentType: null,
  prevContent: {},
  nextContent: {},
};

export default ContentDetail;
