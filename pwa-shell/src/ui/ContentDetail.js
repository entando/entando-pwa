import React, { PureComponent } from 'react';

class ContentDetail extends PureComponent {
  componentDidMount() {
    this.props.onFetchContentDetail();
  }

  render() {
    const { contentDetail } = this.props;
    return contentDetail ? (
      <div className="content" dangerouslySetInnerHTML={{__html: contentDetail.html}}>
      </div>
    ) : '';
  }
}

export default ContentDetail;
