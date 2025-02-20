import React from 'react';
import { Container, Col, Row } from 'reactstrap';
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import Comments from './Comments';
import Summary from './Summary';
import TimeTracking from "./TimeTracking";
import config from 'config';


const { commonText } = config;
const TaskDetails = () => {
    document.title=`Appointments Details | ${ commonText.PROJECT_NAME } - Admin Dashboard`;
    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title="Appointment Details" pageTitle="Tasks" />
                    <Row>
                        <Col xxl={3}>
                            <TimeTracking />
                        </Col>
                        <Col xxl={9}>
                            {/* <Summary />
                            <Comments /> */}
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
};

export default TaskDetails;