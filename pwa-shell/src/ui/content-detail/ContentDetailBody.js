import { get } from 'lodash';
import React from 'react';
import { Container, Card, CardBody } from 'reactstrap';

const ContentDetailBody = ({ contentDetail }) => (
  <Container fluid className="content">
    <Card className="shadow">
      <CardBody>
        <div dangerouslySetInnerHTML={{__html: get(contentDetail, 'html', '')}}></div>
      </CardBody>
    </Card>
  </Container>  
);

export default ContentDetailBody;
