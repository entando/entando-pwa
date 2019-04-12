import { get } from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import { Container } from 'reactstrap';

const loadingMessage = 'Caricamento...';

const ContentDetailBody = ({ contentDetail, isLoading }) => !isLoading ? (
  <Container fluid>
    <div dangerouslySetInnerHTML={{__html: get(contentDetail, 'html', '')}}></div>
  </Container>  
) : (
  <div className="mt-4">
    { loadingMessage }
  </div>
);

ContentDetailBody.propTypes = {
  contentDetail: PropTypes.object,
  isLoading: PropTypes.bool.isRequired,
};

ContentDetailBody.defaultProps = {  
  contentDetail: null,
};

export default ContentDetailBody;
