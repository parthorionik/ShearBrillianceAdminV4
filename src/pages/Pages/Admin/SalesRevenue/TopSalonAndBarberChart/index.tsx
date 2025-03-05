import React from 'react';
import { Card, CardBody, CardHeader, Col, Container, Row } from 'reactstrap';
import { TopBarber} from "./TopBarber";
import PaymentChart from '../Barcharts/PaymentChart';


const TopCharts = () => {
    return (
        <React.Fragment>
            <div className="page-content" style={{padding:'0', width: '100%'}}>            
                <Container fluid>
                    <Row>
                        <Col lg={6}>
                            <Card>
                                <CardHeader >
                                    <h4 className="card-title mb-0">Top Performing Services</h4>
                                </CardHeader>
                                <CardBody style={{marginBottom:"30px"}}>
                                    <TopBarber dataColors='["--vz-success"]'/>
                                </CardBody>
                            </Card>
                            
                        </Col>
                        
                          <PaymentChart/> 
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
};

export default TopCharts;