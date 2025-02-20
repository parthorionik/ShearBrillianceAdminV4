import React from 'react'
import { Card, CardBody, Col, Container, Row } from 'reactstrap'
import CustomerTable from './CustomerTable';
import config from 'config';

const { commonText } = config;
const ReactCustomerTable = () => {
  document.title = `Customer-Table | ${ commonText.PROJECT_NAME }`;
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid className='data-section'>
          <Row>
            <Col lg={12}>
              <Card>
                
                <CardBody>
                  <CustomerTable />
                </CardBody>
              </Card>
            </Col>
          </Row>
          
         
          
        </Container>
      </div>
    </React.Fragment>
  )
}

export default ReactCustomerTable;




