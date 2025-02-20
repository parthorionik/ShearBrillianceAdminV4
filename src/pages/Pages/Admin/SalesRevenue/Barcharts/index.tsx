import React from 'react';
import { Card, CardBody, CardHeader, Col, Container, Row } from 'reactstrap';
import { Basic} from "./BarCharts";


const BarCharts = () => {
    return (
        <React.Fragment>
            <div className="page-content" style={{padding:'0'}}>            
                <Container fluid>
                    <Row>
                        <Col lg={6}>
                            <Card>
                                <CardHeader>
                                    <h4 className="card-title mb-0">Top Performing Services</h4>
                                </CardHeader>
                                <CardBody>
                                    <Basic dataColors='["--vz-success"]'/>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
};

export default BarCharts;