import { get } from 'lodash';
import React, { PureComponent } from 'react';
import { injectIntl, intlShape } from 'react-intl';
import { defineMessages } from 'react-intl.macro';
import { withKeycloak } from 'react-keycloak';
import PropTypes from 'prop-types';
import { Container } from 'reactstrap';
import ProtectedContentLoginContainer from 'ui/login/ProtectedContentLoginContainer';
import PageContainer from 'ui/common/PageContainer';
import SwipeContentNavigator from 'ui/common/SwipeContentNavigator';
import ItemCategoryListContainer from 'ui/common/ItemCategoryListContainer';
import NetworkOfflineWarningContainer from 'ui/network/NetworkOfflineWarningContainer';

const messages = defineMessages({
  loadingProgress: {
    id: 'contentdetail.loadingProgress',
    defaultMessage: 'Loading...',
  },
});

class ContentDetail extends PureComponent {
  state = {
    nextURL: '',
    previousURL: '',
  };

  fetchDetail() {
    const { location, match } = this.props;
    this.props.fetchContentDetail(location, match.params);
  }

  componentDidMount() {
    if (this.props.keycloakInitialized) {
      this.fetchDetail();
    }
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.keycloakInitialized && this.props.keycloakInitialized) {
      this.fetchDetail();
    }
    const newParams = get(this.props, 'match.params');
    if (
      this.props.isUserLogged !== prevProps.isUserLogged ||
      (newParams && newParams !== prevProps.match.params)
    ) {
      this.fetchDetail();
    } else if (
      this.props.nextContent !== prevProps.nextContent ||
      this.props.prevContent !== prevProps.prevContent
    ) {
      this.checkContentSiblings();
    }
  }

  checkContentSiblings() {
    const { nextContent, prevContent, contentType } = this.props;

    const hasNext = Object.keys(nextContent).length > 0;
    const hasPrev = Object.keys(prevContent).length > 0;
    this.setState({
      nextURL: hasNext
        ? `/content/${contentType}/${nextContent.id}${
            nextContent.requiresAuth ? '?requiresAuth=true' : ''
          }`
        : '',
      previousURL: hasPrev
        ? `/content/${contentType}/${prevContent.id}${
            prevContent.requiresAuth ? '?requiresAuth=true' : ''
          }`
        : '',
    });
  }

  render() {
    const { intl, contentDetail, isLoading, isUserLogged } = this.props;
    const loadingMessage = intl.formatMessage(messages.loadingProgress);
    const associatedCategoryIdList = get(contentDetail, 'categories', []);

    const contentDetailBody = !isLoading ? (
      <Container fluid>
        <ItemCategoryListContainer categoryIdList={associatedCategoryIdList} />
        <div
          dangerouslySetInnerHTML={{ __html: get(contentDetail, 'html', '') }}
        />
      </Container>
    ) : (
      <div className="mt-4">{loadingMessage}</div>
    );

    const messageComponents = <NetworkOfflineWarningContainer />;

    return (
      <PageContainer
        className={`ContentDetail${isUserLogged ? '' : '--guest-user'}`}
        messageComponents={messageComponents}
      >
        <ProtectedContentLoginContainer>
          <SwipeContentNavigator
            nextURL={this.state.nextURL}
            previousURL={this.state.previousURL}
          >
            <div className="ContentDetail__body">{contentDetailBody}</div>
          </SwipeContentNavigator>
        </ProtectedContentLoginContainer>
      </PageContainer>
    );
  }
}

ContentDetail.propTypes = {
  intl: intlShape.isRequired,
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

export default injectIntl(withKeycloak(ContentDetail));
