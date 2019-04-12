import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ContentListItem from 'ui/content-list/ContentListItem';
import CategoryListContainer from 'ui/content-list/CategoryListContainer';
import { Container } from 'reactstrap';
import PageContainer from 'ui/common/PageContainer';
import ContentListTopBarContainer from 'ui/content-list/ContentListTopBarContainer';

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
        <ContentListTopBarContainer />

        { categoryList }
        { searchResults }
        <Container fluid className="content">        
        <div className="mt-4">
          { loadingMessage }
        </div>
        {
          selectedCategoryCodes && selectedCategoryCodes.length
            ? (
              contentList && contentList.length ?
              <div>
                { contentListItems }
              </div>
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
  contentType: PropTypes.string,
  selectedCategoryCodes: PropTypes.arrayOf(PropTypes.string),
  isSearchResult: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  searchTerms: PropTypes.string,
  fetchContentList: PropTypes.func.isRequired,
};

ContentList.defaultProps = {  
  contentList: [],
  contentType: null,
  selectedCategoryCodes: [],
  searchTerms: '',
};

export default ContentList;
