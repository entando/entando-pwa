import React, { PureComponent, PropTypes } from 'react';

class ContentDetail extends PureComponent {
  componentDidMount() {
    this.props.onFetchContentDetail();
  }

  renderDescription(data) {
    if (data && Object.hasOwnProperty.call(data, 'title')) {
      return (
        <div className="story-top">
          <div className="story-title">
            {data.title}
          </div>
          <ol className="story-ol">
            <li>id: {data.id}</li>
          </ol>
        </div>
      );
    }
  }

  render() {
    const { state } = this.props;
    return (
      <div className="content">
        {this.renderDescription(state)}
      </div>
    );
  }
}

export default ContentDetail;
