import React from 'react';
import { Card, CardBody, Col, Container, Row } from 'reactstrap';
import CalenderScheduleInfo from './CalenderScheduleInfo';
import config from 'config';

const { commonText } = config;
const ReactTable = () => {
  document.title = `Future Appointments | ${ commonText.PROJECT_NAME }`;

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid className='data-section'>
          <Row>
            <Col lg={12}>
              <Card>

                <CardBody>
                  <CalenderScheduleInfo />
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