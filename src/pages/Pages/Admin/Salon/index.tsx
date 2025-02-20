import React from 'react'
import { Card, CardBody, CardHeader, Col, Container, Row } from 'reactstrap'
import SalonTable from '../Salon/SalonTable';
import config from 'config';

const { commonText } = config;
const SalonReactTable = () => {
  document.title = `Salon-Table | ${ commonText.PROJECT_NAME }`;
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid className='data-section'>
          <Row>
            <Col lg={12}>
              <Card>
               
                <CardBody>
                  <SalonTable />
                </CardBody>
              </Card>
            </Col>
          </Row>
          
         
          
        </Container>
      </div>
    </React.Fragment>
  )
}

export default SalonReactTable;