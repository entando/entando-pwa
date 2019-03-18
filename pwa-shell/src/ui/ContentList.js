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
    const { contentList, contentType } = this.props;

    const categoryFilter = contentType ? <CategoryListContainer contentType={contentType} /> : '';

    const contentListItems = contentList.map((item, index) => (
      <ContentListItem index={index} data={{...item, contentType}} key={index} />
    ));

    return (
      <Container fluid className="content">
        { categoryFilter }
        {
          contentList && contentList.length ?
          <div>
            { contentListItems }
          </div>
          : 'Caricamento...'
        }
      </Container>
    );
  }
}

export default ContentList;
