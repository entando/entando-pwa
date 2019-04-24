import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { Input } from 'reactstrap';

class ContentTypeFilter extends PureComponent {
  constructor(props) {
    super(props);
    this.handleSelectContentType = this.handleSelectContentType.bind(this);
  }

  componentDidMount() {
    this.props.onFetchContentTypes();
  }

  handleSelectContentType(event) {
    this.props.onSelectContentType(event.target.value);
  }

  render() {
    const {
      contentTypeList,
      contentTypeMap,
      selectedContentType,
    } = this.props;

    return contentTypeList.length > 0 ? (
        <Input type="select" value={selectedContentType} onChange={this.handleSelectContentType}>
          <option value={null}>Tutti</option>
          {
            contentTypeList.map(contentType => (
              <option value={contentType}>
                { get(contentTypeMap, `${contentType}.name`, contentType) }
              </option>
            ))
          }
        </Input>
      ) : null;
  }
}

ContentTypeFilter.propTypes = {
  contentTypeList: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedContentType: PropTypes.string,
  contentTypeMap: PropTypes.object.isRequired,
  onSelectContentType: PropTypes.func.isRequired,
  onFetchContentTypes: PropTypes.func.isRequired,
};

export default ContentTypeFilter;
