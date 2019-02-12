import React, { PureComponent } from 'react';

class ContentDetail extends PureComponent {
  componentDidMount() {
    this.props.onFetchContentDetail();
  }

  render() {
    const { contentDetail } = this.props;
    return contentDetail ? (
      <div className="content">
        <div className="story-top">
          <div className="story-title">
            {contentDetail.title}
          </div>
          <ol className="story-ol">
            <li>id: {contentDetail.id}</li>
          </ol>
        </div>
      </div>
    ) : '';
  }
}

export default ContentDetail;
