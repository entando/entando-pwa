import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroller';
import ContentListItem from 'ui/content-list/ContentListItem';
import CategoryListContainer from 'ui/content-list/CategoryListContainer';
import { Container, Spinner } from 'reactstrap';
import PageContainer from 'ui/common/PageContainer';
import ContentListTopBarContainer from 'ui/content-list/ContentListTopBarContainer';
import ToastsContainer from 'ui/common/ToastsContainer';

class ContentList extends PureComponent {

  componentDidMount() {
    this.props.fetchContentList();
  }

  componentDidUpdate(prevProps) {
    if (this.props.contentType !== prevProps.contentType) {
      this.props.fetchContentList();
    }
  }

  render() {
    const {
      contentList,
      contentType,
      fetchNextContentList,
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
      <PageContainer className="ContentList">
        <ToastsContainer />
        <ContentListTopBarContainer />        

        { categoryList }
        { searchResults }
        <Container fluid className="content">
          {
            selectedCategoryCodes && selectedCategoryCodes.length
              ? (
                contentList && contentList.length ?
                <InfiniteScroll
                  pageStart={0}
                  loadMore={fetchNextContentList}
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
      </PageContainer>
    );
  }
}

ContentList.propTypes = {
  contentList: PropTypes.arrayOf(PropTypes.object),
  hasMoreItems: PropTypes.bool, 
  contentType: PropTypes.string,
  selectedCategoryCodes: PropTypes.arrayOf(PropTypes.string),
  isSearchResult: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  searchTerms: PropTypes.string,
  fetchContentList: PropTypes.func.isRequired,
  fetchNextContentList: PropTypes.func.isRequired,
};

ContentList.defaultProps = {  
  contentList: [],
  hasMoreItems: false,
  contentType: null,
  selectedCategoryCodes: [],
  searchTerms: '',
};

export default ContentList;
