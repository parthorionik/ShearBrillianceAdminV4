import React from 'react'
import { Card, CardBody,Col, Container, Row } from 'reactstrap'
import BlogTable from './BlogTable'
import config from 'config';

const { commonText } = config;
const ReactTable = () => {
  document.title = `Blogs-Table | ${ commonText.PROJECT_NAME }`;
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid className='data-section'>
          <Row>
            <Col lg={12}>
              <Card>
               
                <CardBody>
                  <BlogTable />
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