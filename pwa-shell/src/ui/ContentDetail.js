import { get } from 'lodash';
import React, { PureComponent } from 'react';
import { Container, Card, CardBody } from 'reactstrap';

import LoginContainer from 'ui/login/LoginContainer';

class ContentDetail extends PureComponent {
  componentDidMount() {
    this.props.fetchContentDetailAndMarkAsRead();
  }

  render() {
    const { contentDetail } = this.props;

    const html = get(contentDetail, 'html', '');
    const detailCmp = (
      <Container fluid className="content">
        <Card className="shadow">
          <CardBody>
            <div dangerouslySetInnerHTML={{__html: html}}></div>
          </CardBody>
        </Card>
      </Container>
    );

    return contentDetail ? 
      contentDetail.requiresAuth !== false ?
        (
          <LoginContainer>
            { detailCmp }
          </LoginContainer>
        ) :
        detailCmp :
      ''
  }
}

export default ContentDetail;
