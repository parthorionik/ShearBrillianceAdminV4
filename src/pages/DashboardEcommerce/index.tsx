import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "reactstrap";
import Widget from "./Widgets";
import Section from "./Section";
import { fetchDashboardData } from "Services/DashboardService";
import Loader from "Components/Common/Loader";
import ProjectsStatus from "./ProjectsStatus";
import { toast, ToastContainer } from "react-toastify";
import config from "config";

export const DASHBOARD_ENDPOINT = "/dashboard";
const { commonText } = config;

const DashboardEcommerce = () => {
  document.title = `${ commonText.PROJECT_NAME } Admin`;
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [rightColumn, setRightColumn] = useState<boolean>(true);
  const [showLoader, setShowLoader] = useState(true);
  const toggleRightColumn = () => {
    setRightColumn(!rightColumn);
  };

  useEffect(() => {
    setShowLoader(true);
    const getDashboardData = async () => {
    
      try {
        const response: any = await fetchDashboardData();
        setDashboardData(response);
        setShowLoader(false);
      } catch (error: any) {
          // Check if the error has a response property (Axios errors usually have this)
      if (error.response && error.response.data) {
        const apiMessage = error.response.data.message; // Extract the message from the response
        toast.error(apiMessage || "An error occurred"); // Show the error message in a toaster
      } else {
        // Fallback for other types of errors
        toast.error(error.message || "Something went wrong");
      }
      }
    };
    getDashboardData();
  }, []);
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid className="data-section">
          <Row>
            <Col>
              <div className="h-100">
                <Section rightClickBtn={toggleRightColumn} />
                <Row>
                  {showLoader ? (
                    <Loader />
                  ) : (
                    <Widget dashboard={dashboardData} />
                  )}
                </Row>
              </div>
            </Col>
          </Row>
        <div style={{display:"flex",gap:"10px"}}>
          <ProjectsStatus />
        </div>
          
        </Container>
      </div>
      
      <ToastContainer closeButton={false} limit={1} />
    </React.Fragment>
  );
};

export default DashboardEcommerce;
