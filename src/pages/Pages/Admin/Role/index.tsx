import React from 'react'
import { Card, CardBody,Col, Container, Row } from 'reactstrap'
import  RoleTable from '../../Admin/Role/RoleTable'
import config from 'config';

const { commonText } = config;
const ReactTable = () => {
  document.title = `Role-Table | ${ commonText.PROJECT_NAME }`;
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid className='data-section'>
          <Row>
            <Col lg={12}>
              <Card>
               
                <CardBody>
                  <RoleTable />
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