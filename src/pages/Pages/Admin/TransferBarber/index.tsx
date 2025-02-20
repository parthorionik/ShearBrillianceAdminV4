import React from 'react'
import { Card, CardBody, CardHeader, Col, Container, Row } from 'reactstrap'
import  SalonTransferBarber from '../../Admin/TransferBarber/SalonTransferBarber'
import config from 'config';

const { commonText } = config;
const ReactTable = () => {
  document.title = `Transfer Barber | ${ commonText.PROJECT_NAME }`;
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid className='data-section'>
          <Row>
            <Col lg={12}>
              <Card>
               
                <CardBody>
                  <SalonTransferBarber />
                </CardBody>
              </Card>
            </Col>
          </Row>
          
         
          
        </Container>
      </div>
    </React.Fragment>
  )
}

export default ReactTable;