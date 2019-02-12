import React, { PureComponent, PropTypes } from 'react';
import ContentListItem from 'ui/ContentListItem';
import { loadingPic } from 'ui/loading';

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
    return (
      <div>
        {this.renderList(contentList, contentType)}
      </div>
    );
  }

  renderContentListItems(contentList, contentType) {
    return contentList.map((item, index) => (
      <ContentListItem index={index} data={{...item, contentType}} key={index} />
    ));
  }

  renderLoading() {
    return (
      <div className="loading">
        <img src={loadingPic} alt="loading" />
      </div>
    );
  }

  renderList(contentList, contentType) {
    return (
      <div className="content">
        {
          contentType && contentList && contentList.length ?
            <ol>
              {this.renderContentListItems(contentList, contentType)}
            </ol> :
            this.renderLoading()
        }
      </div>
    );
  }
}

export default ContentList;
