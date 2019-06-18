import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Container, Spinner } from 'reactstrap';
import { injectIntl, intlShape } from 'react-intl';
import { FormattedMessage, defineMessages } from 'react-intl.macro';
import InfiniteScroll from 'react-infinite-scroller';
import ContentListItem from 'ui/content-list/ContentListItem';
import SelectedCategoryListContainer from 'ui/content-list/SelectedCategoryListContainer';
import PageContainer from 'ui/common/PageContainer';

const messages = defineMessages({
  searchLoadingProgress: {
    id: 'contentlist.searchLoadingProgress',
    defaultMessage: 'Searching...',
  },
  loadingProgress: {
    id: 'contentlist.loadingProgress',
    defaultMessage: 'Loading...',
  },
});

class ContentList extends PureComponent {
  constructor(props) {
    super(props);
    this.loadMoreListItems = this.loadMoreListItems.bind(this);
  }

  componentDidMount() {
    this.props.fetchCategoryListAndFilters();
    this.fetchContentListWithFilter();
  }

  componentDidUpdate(prevProps) {
    if (this.props.contentType !== prevProps.contentType) {
      this.fetchContentListWithFilter();
    }
  }

  fetchContentListWithFilter(params = {}) {
    const { fetchContentList, isSearchResult, searchTerms } = this.props;
    const filters = {
      search: isSearchResult ? searchTerms : '',
      ...params,
    };
    fetchContentList(filters);
  }

  loadMoreListItems() {
    if (!this.props.isLoading) {
      const { contentListMeta } = this.props;
      const { page, pageSize } = contentListMeta;
      const pageObj = { page: page + 1, pageSize };
      this.fetchContentListWithFilter({ pageObj });
    }
  }

  render() {
    const {
      intl,
      contentList,
      requiresAuthMap,
      hasMoreItems,
      selectedCategoryCodes,
      isSearchResult,
      isLoading,
      searchTerms,
    } = this.props;

    const categoryList = isSearchResult ? (
      ''
    ) : (
      <SelectedCategoryListContainer />
    );

    const contentListItems = contentList.map((item, index) => (
      <ContentListItem
        data={item}
        requiresAuth={requiresAuthMap[item.id]}
        key={index}
      />
    ));

    const loadingMessage = !isLoading
      ? null
      : isSearchResult
      ? intl.formatMessage(messages.searchLoadingProgress)
      : intl.formatMessage(messages.loadingProgress);

    const searchResults = isLoading ? null : isSearchResult ? (
      <div className="ContentList__search-results__header p-4">
        <span className="ContentList__search-results__size">
          <FormattedMessage
            id="contentlist.searchResultCount"
            defaultMessage="{count} risultat{count,plural,=0{i}one{o}other{i}}"
            values={{ count: contentList.length }}
          />
        </span>
        &nbsp;
        <FormattedMessage
          id="contentlist.searchResultTerm"
          defaultMessage="for: {keyword}"
          values={{ keyword: searchTerms }}
        />
      </div>
    ) : null;

    return (
      <PageContainer className="ContentList">
        {categoryList}
        {searchResults}
        <Container fluid className="content">
          {selectedCategoryCodes && selectedCategoryCodes.length ? (
            contentList && contentList.length ? (
              <InfiniteScroll
                pageStart={0}
                loadMore={this.loadMoreListItems}
                hasMore={hasMoreItems}
                threshold={50}
                loader={
                  <div key={-1} className="mt-4 ContentList__load-more">
                    {loadingMessage}
                    &nbsp;
                    <Spinner size="sm" color="primary" />
                  </div>
                }
              >
                {contentListItems}
              </InfiniteScroll>
            ) : (
              <div>
                <FormattedMessage
                  id="contentlist.noArticlesMessage"
                  defaultMessage="No articles found."
                />
              </div>
            )
          ) : (
            <FormattedMessage
              id="contentlist.noTopicsSelected"
              defaultMessage="No topics selected. Select at least one topic from the top left menu."
            />
          )}
        </Container>
      </PageContainer>
    );
  }
}

ContentList.propTypes = {
  intl: intlShape.isRequired,
  contentList: PropTypes.arrayOf(PropTypes.object),
  requiresAuthMap: PropTypes.object,
  contentListMeta: PropTypes.object,
  hasMoreItems: PropTypes.bool,
  contentType: PropTypes.string,
  selectedCategoryCodes: PropTypes.arrayOf(PropTypes.string),
  isSearchResult: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  searchTerms: PropTypes.string,
  fetchContentList: PropTypes.func.isRequired,
};

ContentList.defaultProps = {
  contentList: [],
  requiresAuthMap: {},
  contentListMeta: {},
  hasMoreItems: false,
  contentType: null,
  selectedCategoryCodes: [],
  searchTerms: '',
};

export default injectIntl(ContentList);
