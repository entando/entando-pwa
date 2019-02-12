import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

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

/*
ContentDetail.propTypes = {
  notification: PropTypes.string,
  onFetchContentDetail: PropTypes.func.isRequired,
};


ContentDetail.defaultProps = {
  notifications: [],
  onClickUsername: () => {},
  onClickLike: () => {},
};
*/
export default ContentDetail;
