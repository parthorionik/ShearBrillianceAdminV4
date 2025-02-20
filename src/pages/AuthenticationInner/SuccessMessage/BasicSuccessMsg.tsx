import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, Col, Container, Row } from 'reactstrap';
import ParticlesAuth from "../ParticlesAuth";
import config from 'config';

const { commonText } = config;
//import images

const BasicSuccessMsg = () => {
    document.title = `Success Message | ${ commonText.PROJECT_NAME } - Admin Dashboard`;
    return (
        <React.Fragment>
            <ParticlesAuth>
                <div className="auth-page-content mt-lg-5">
                    <Container>
                       
                        <Row className="justify-content-center">
                            <Col md={8} lg={6} xl={5}>
                                <Card className="mt-4">
                                    <CardBody className="p-4 text-center">
                                        <div className="avatar-lg mx-auto mt-2">
                                            <div className="avatar-title bg-light text-success display-3 rounded-circle">
                                                <i className="ri-checkbox-circle-fill"></i>
                                            </div>
                                        </div>
                                        <div className="mt-4 pt-2">
                                            <h4>Well done !</h4>
                                            <p className="text-muted mx-4">Aww yeah, you successfully read this important message.</p>
                                            <div className="mt-4">
                                                <Link to="/auth-signin-basic" className="btn btn-success w-100">Back to Dashboard</Link>
                                            </div>
                                        </div>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </ParticlesAuth>
        </React.Fragment >
    );
};

export default BasicSuccessMsg;