import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Container, Spinner } from 'reactstrap';
import { injectIntl, intlShape } from 'react-intl';
import { FormattedMessage, defineMessages } from 'react-intl.macro';
import InfiniteScroll from 'react-infinite-scroller';
import ContentListItem from 'ui/content-list/ContentListItem';
import CategoryListContainer from 'ui/content-list/CategoryListContainer';
import Page from 'ui/common/Page';

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
    this.props.fetchContentList();
  }

  componentDidUpdate(prevProps) {
    if (this.props.contentType !== prevProps.contentType) {
      this.props.fetchContentList();
    }
  }

  loadMoreListItems() {
    if (!this.props.isLoading) {
      const { page, pageSize } = this.props.contentListMeta;
      this.props.fetchContentList({ page: page + 1, pageSize });
    }
  }

  render() {
    const {
      intl,
      contentList,
      contentType,
      hasMoreItems,
      selectedCategoryCodes,
      isSearchResult,
      isLoading,
      searchTerms,
    } = this.props;

    const categoryList =
      contentType && !isSearchResult ? (
        <CategoryListContainer contentType={contentType} />
      ) : (
        ''
      );

    const contentListItems = contentList.map((item, index) => (
      <ContentListItem data={item} key={index} />
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
      <Page className="ContentList">
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
      </Page>
    );
  }
}

ContentList.propTypes = {
  intl: intlShape.isRequired,
  contentList: PropTypes.arrayOf(PropTypes.object),
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
  contentListMeta: {},
  hasMoreItems: false,
  contentType: null,
  selectedCategoryCodes: [],
  searchTerms: '',
};

export default injectIntl(ContentList);
