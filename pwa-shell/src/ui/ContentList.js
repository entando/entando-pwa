import React, { PureComponent, Fragment } from 'react';
import ContentListItem from 'ui/ContentListItem';
import { loadingPic } from 'ui/loading';
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
        {
          contentType && contentList && contentList.length ?
            <Fragment>
              <CategoryFilterContainer contentType={contentType} />
              <ol>
                { contentListItems }
              </ol> 
            </Fragment> :
            <div className="loading">
              <img src={loadingPic} alt="loading" />
            </div>
        }
      </div>
    );
  }
}

export default ContentList;
