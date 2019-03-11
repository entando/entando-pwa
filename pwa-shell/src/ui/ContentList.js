import React, { PureComponent } from 'react';
import ContentListItem from 'ui/ContentListItem';
import CategoryFilterContainer from 'ui/CategoryFilterContainer';

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

    const contentListItems = contentList.map((item, index) => (
      <ContentListItem index={index} data={{...item, contentType}} key={index} />
    ));

    return (
      <div className="content">
        { contentType ? <CategoryFilterContainer contentType={contentType} /> : '' }
        {
          contentList && contentList.length ?
          <ol>
            { contentListItems }
          </ol> 
          : 'Sorry, no content matched your criteria'
        }
      </div>
    );
  }
}

export default ContentList;
