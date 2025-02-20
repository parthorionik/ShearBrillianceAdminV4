import React from 'react'

import { Container } from 'reactstrap'
import BreadCrumb from 'Components/Common/BreadCrumb'
import Board from './Board'
import config from 'config';


const { commonText } = config;


const Kanbanboard = () => {

    document.title = `Board | ${ commonText.PROJECT_NAME }`;

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title="Today's Walk-In Appointments Board" pageTitle="Tasks" />
                    <Board />
                </Container>
            </div>
        </React.Fragment>


    )
}

export default Kanbanboard