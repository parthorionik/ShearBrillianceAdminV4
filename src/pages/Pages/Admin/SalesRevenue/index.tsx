import React from 'react'

import { Container} from 'reactstrap'
import BreadCrumb from 'Components/Common/BreadCrumb'
import Salesrevenue from './salesrevenue';
import BalanceOverview from 'pages/Pages/Admin/SalesRevenue/BalanceOverview';
import CheckinOverview from 'pages/Pages/Admin/SalesRevenue/CheckinChart';
import BarCharts from './Barcharts';
import config from 'config';


const { commonText } = config;

const Salesrevenueindex = () => {

    document.title = `SalesRevenue | ${ commonText.PROJECT_NAME }`;

    return (
        <React.Fragment> 
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title="Sales & Revenue" pageTitle="Check" />
                    <Salesrevenue/>
                    <div style={{display:'flex', flexDirection:'column',}}>
                        <BarCharts/>
                        <BalanceOverview/>
                        <CheckinOverview />
                    </div>
                </Container>
            </div>
        </React.Fragment>


    )
}

export default Salesrevenueindex