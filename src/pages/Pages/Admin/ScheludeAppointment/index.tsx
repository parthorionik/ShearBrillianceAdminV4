import React from 'react'

import { Container } from 'reactstrap'
import BreadCrumb from 'Components/Common/BreadCrumb'
import Scheduleappointment from './scheduleappointment';
import config from 'config';

const { commonText } = config;
const Salonscheduleappointment = () => {

    document.title = `Appointments | ${ commonText.PROJECT_NAME }`;

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title="Book Appointment & Schedule" pageTitle="Appointment" />
                    <Scheduleappointment/>
                </Container>
            </div>
        </React.Fragment>

        


    )
}

export default Salonscheduleappointment