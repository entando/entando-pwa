import React, { PureComponent, PropTypes } from 'react';
import ContentListItem from 'ui/ContentListItem';
import { loadingPic } from 'public/loading';

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
    const { match } = this.props;
    const page = Number(match.params.page);
    let element;
    if (page > 1) {
      element = (
        <div className="footer-page">
          content is null, please read prev page!
        </div>
      );
    } else {
      element = (
        <div className="loading">
          <img src={loadingPic} alt="loading" />
        </div>
      );
    }
    return element;
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
