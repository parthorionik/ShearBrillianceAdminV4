import React from 'react';
import { Card, CardBody, Col, Container, Row } from 'reactstrap';
import BarberSessionsTable from './BarberSessionsTable';
import config from 'config';

const { commonText } = config;
const ReactTable = () => {
  document.title = `Barber Schedules | ${ commonText.PROJECT_NAME }`;

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid className='data-section'>
          <Row>
            <Col lg={12}>
              <Card>

                <CardBody>
                  <BarberSessionsTable />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>

    </React.Fragment>
  );
};

export default ReactTable;