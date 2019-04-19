import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Badge from 'ui/common/Badge';

class ContentCategoryList extends PureComponent {
  componentDidMount() {
    this.props.fetchCategoryList();
  }

  render() {
    const { contentCategoryList } = this.props;
    return contentCategoryList && contentCategoryList.length ? (
      <span className="ContentCategoryList">
        {
          contentCategoryList.map(category => (
            <Badge key={category.code}>{category.titles['it']}</Badge>
          ))
        }
      </span>
    ) : '';
  }
}

ContentCategoryList.propTypes = {
  contentCategoryList: PropTypes.arrayOf(PropTypes.object),
};

ContentCategoryList.defaultProps = {
  contentCategoryList: [],
};

export default ContentCategoryList;
