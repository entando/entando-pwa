import React, { PureComponent } from 'react';
import ContentListItem from 'ui/ContentListItem';
import CategoryListContainer from 'ui/CategoryListContainer';
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
    const { contentList, contentType, selectedCategoryCodes } = this.props;

    const categoryList = contentType ? <CategoryListContainer contentType={contentType} /> : '';

    const contentListItems = contentList.map((item, index) => (
      <ContentListItem index={index} data={{...item, contentType}} key={index} />
    ));

    return (
      <Container fluid className="content">        
        { categoryList }
        {
          selectedCategoryCodes && selectedCategoryCodes.length 
            ? (
              contentList && contentList.length ?
              <div>
                { contentListItems }
              </div>
              : 'Caricamento...'
            )
            : 'Nessun argomento selezionato. Seleziona almeno un argomento dal menu in alto a sinistra.'
        }
      </Container>
    );
  }
}

export default ContentList;
