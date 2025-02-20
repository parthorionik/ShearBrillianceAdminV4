import React from 'react'
import { Card, CardBody, Col, Container, Row } from 'reactstrap'
import OurServiceTable from './OurServiceTable';
import config from 'config';

const { commonText } = config;
const ReactOurServiceTable = () => {
  document.title = `Service-Table | ${ commonText.PROJECT_NAME }`;
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid className='data-section'>
          <Row>
            <Col lg={12}>
              <Card>
               
                <CardBody>
                  <OurServiceTable />
                </CardBody>
              </Card>
            </Col>
          </Row>
          
         
          
        </Container>
      </div>
    </React.Fragment>
  )
}

export default ReactOurServiceTable;