import React, { PureComponent } from 'react';
import ContentListItem from 'ui/content-list/ContentListItem';
import CategoryListContainer from 'ui/content-list/CategoryListContainer';
import { Container } from 'reactstrap';

class ContentList extends PureComponent {

  componentDidMount() {
    this.props.onFetchContentList();
  }

  componentDidUpdate(prevProps) {
    if (this.props.contentType !== prevProps.contentType) {
      this.props.onFetchContentList();
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

    const notFound = isLoading ?
      null :
      isSearchResult ?
        (
          <span>
            <strong>{contentList.length} risultat{contentList.length === 1 ? 'o' : 'i'}</strong> per: "{searchTerms}"
          </span>
        ) :
        null;

    return (
      <Container fluid className="content">
        { categoryList }
        <div className="mt-4">
          { loadingMessage }
          { notFound }
        </div>
        {
          selectedCategoryCodes && selectedCategoryCodes.length
            ? (
              contentList && contentList.length ?
              <div>
                { contentListItems }
              </div>
              : <div>Nessun articolo trovato...</div>
            )
            : 'Nessun argomento selezionato. Seleziona almeno un argomento dal menu in alto a sinistra.'
        }
      </Container>
    );
  }
}

export default ContentList;
