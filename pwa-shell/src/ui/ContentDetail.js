import React, { PureComponent } from 'react';
import { Container, Card, CardBody } from 'reactstrap';

class ContentDetail extends PureComponent {
  componentDidMount() {
    this.props.onFetchContentDetail();
  }

  render() {
    const { contentDetail } = this.props;
    return contentDetail ? (
      <Container fluid className="content">
        <Card className="shadow">
          <CardBody>
            <div dangerouslySetInnerHTML={{__html: contentDetail.html}}></div>
          </CardBody>
        </Card>
      </Container>
    ) : '';
  }
}

export default ContentDetail;
