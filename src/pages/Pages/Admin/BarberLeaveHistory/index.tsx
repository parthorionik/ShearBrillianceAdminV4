import React, { useEffect, useState } from 'react';
import { Card, CardBody, CardHeader, Col, Container, Row } from 'reactstrap';
import BarberLeaveHistory from './BarberLeaveHistory';
import config from 'config';

const { commonText } = config;
const ReactTable = () => {
  document.title = `Barber Leave History | ${ commonText.PROJECT_NAME }`;  // Title of the page
  // const [BarberId, setBarberId] = useState<any | null>(null);  // State for barberId

  // You can replace this logic with actual dynamic fetching or change of barberId
 

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid className='data-section'>
          <Row>
            <Col lg={12}>
              <Card>
                {/* <CardHeader>
                  <h4 className="card-title">Barber Leave History</h4>
                </CardHeader> */}
                <CardBody>
                  {/* Pass barberId dynamically to the LeaveHistoryTable */}
                  <BarberLeaveHistory />

                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
}

export default ReactTable;
