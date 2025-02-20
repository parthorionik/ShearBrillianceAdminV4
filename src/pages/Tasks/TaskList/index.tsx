import React from 'react';
import { Container, Row } from 'reactstrap';
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import AllTasks from './AllTasks';
import Widgets from './Widgets';
import config from 'config';


const { commonText } = config;
const TaskList = () => {
    document.title = `Appointment List | ${ commonText.PROJECT_NAME } - Admin Dashboard`;
    return (
        <React.Fragment>
            <div className="page-content">

                <Container fluid>
                    <BreadCrumb title="Appointment List" pageTitle="Appointments" />
                    <Row>
                        <Widgets />
                    </Row>
                    <AllTasks />
                </Container>
            </div>
        </React.Fragment>
    );
};

export default TaskList;