import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroller';
import ContentListItem from 'ui/content-list/ContentListItem';
import CategoryListContainer from 'ui/content-list/CategoryListContainer';
import { Container, Spinner } from 'reactstrap';
import Page from 'ui/common/Page';

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
      contentList,
      contentType,
      hasMoreItems,
      selectedCategoryCodes,
      isSearchResult,
      isLoading,
      searchTerms,
    } = this.props;

    const categoryList = contentType && !isSearchResult ? <CategoryListContainer contentType={contentType} /> : '';

    const contentListItems = contentList.map((item, index) => (
      <ContentListItem data={item} key={index} />
    ));

    const loadingMessage = !isLoading ?
      null :
      isSearchResult ?
        'Ricerca in corso...' :
        'Caricamento...';

    const searchResults = isLoading ?
      null :
      isSearchResult ?
        (
          <div className="ContentList__search-results__header p-4">
            <span className="ContentList__search-results__size">
              {contentList.length} risultat{contentList.length === 1 ? 'o' : 'i'}
            </span> per: "{searchTerms}"
          </div>
        ) :
        null;

    return (
      <Page
        className="ContentList"
      >
        { categoryList }
        { searchResults }
        <Container fluid className="content">
          {
            selectedCategoryCodes && selectedCategoryCodes.length
              ? (
                contentList && contentList.length ?
                <InfiniteScroll
                  pageStart={0}
                  loadMore={this.loadMoreListItems}
                  hasMore={hasMoreItems}
                  threshold={50}
                  loader={<div key={-1} className="mt-4 ContentList__load-more">{ loadingMessage } <Spinner size="sm" color="primary" /></div>}
                >
                  { contentListItems }
                </InfiniteScroll>
                : <div>Nessun articolo trovato</div>
              )
              : 'Nessun argomento selezionato. Seleziona almeno un argomento dal menu in alto a sinistra.'
          }
        </Container>
      </Page>
    );
  }
}

ContentList.propTypes = {
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

export default ContentList;
