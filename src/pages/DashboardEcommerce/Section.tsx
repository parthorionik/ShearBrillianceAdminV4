import React, { useEffect, useState } from "react";
import { Col, Row, Spinner } from "reactstrap";
import Flatpickr from "react-flatpickr";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "flatpickr/dist/themes/material_blue.css"; // Flatpickr theme
import Loader from "Components/Common/Loader";
import { generatereport } from "Services/Insalonappointment";

const Section = (props: any) => {
  const [userInformation, setUserInformation] = useState<any>(null);
  const [userRole, setUserRole] = useState<any>();
  const [greeting, setGreeting] = useState("");
  const [selectedStartDate, setStartDate] = useState<any>(new Date());
  const [selectedEndDate, setEndDate] = useState<any>(new Date());
  const [showLoader, setShowLoader] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showSpinner, setShowSpinner] = useState<boolean>(false);

  useEffect(() => {
    const authUser = localStorage.getItem("authUser");
    if (authUser) {
      const authUserData = JSON.parse(authUser);
      setUserInformation(authUserData);
      setUserRole(authUserData.user.role);
    }

    const updateGreeting = () => {
      const currentHour = new Date().getHours();
      if (currentHour >= 5 && currentHour < 12) {
        setGreeting("Good Morning");
      } else if (currentHour >= 12 && currentHour < 17) {
        setGreeting("Good Afternoon");
      } else if (currentHour >= 17 && currentHour < 21) {
        setGreeting("Good Evening");
      } else {
        setGreeting("Good Night");
      }
    };

    updateGreeting();
    const interval = setInterval(updateGreeting, 60 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const applyDateFilter = async () => {
    setShowSpinner(true);
    setShowLoader(true);
    try {
      const response = await generatereport(selectedStartDate, selectedEndDate);
      if (response) {
        const downloadLink = response.downloadLink;
        toast.success("PDF report generated successfully!");
        window.open(downloadLink, "_blank");
      } else {
        toast.error("Failed to generate PDF report.");
      }
    } catch (error: any) {
      if (error.response && error.response.data) {
        const apiMessage = error.response.data.message;
        toast.error(apiMessage || "An error occurred");
      } else {
        toast.error(error.message || "Something went wrong");
      }
    } finally {
      setShowSpinner(false);
      setShowLoader(false);
    }
    setShowDatePicker(false);
  };
  const showToast = (message: string) => {
    toast.warning(message); // Display warning toast message
  };

  return (
    <React.Fragment>
      <Row className="mb-3 pb-1">
        <Col xs={12}>
          <div className="d-flex align-items-lg-center flex-lg-row flex-column">
            <div className="flex-grow-1">
              <h4 className="fs-16 mb-1">
                {greeting}, {userRole?.role_name}!
              </h4>
              <p className="text-muted mb-0">
                Tracking your salon’s story from day one!
              </p>
            </div>
            {userRole?.role_name === "Admin" ||
              userRole?.role_name === "Salon Owner" ? (
              <div className="mt-3 mt-lg-0">
                <div className="d-flex justify-content-between align-items-center col-auto p-2 bg-light">
                  <p className="text-uppercase fw-medium text-muted text-truncate mb-0 me-2">
                    Generate Report
                  </p>
                  <button
                    type="button"
                    className="btn btn-soft-info btn-icon waves-effect waves-light"
                    onClick={() => setShowDatePicker(!showDatePicker)}
                    title="Select Date Range"
                    aria-label="Select Date Range"
                  >
                    <i className="ri-download-line"></i>
                  </button>
                </div>
              </div>
            ) : null}
          </div>

          {showDatePicker && (
            <div className="d-flex align-items-center mt-3">
              <Flatpickr
                className="form-control me-2 w-25"
                value={selectedStartDate}
                onChange={(dates: any) => setStartDate(dates[0])}
                options={{ dateFormat: "Y-m-d" }}
                placeholder="Select Start Date"
              />

              <Flatpickr
                className="form-control me-2 w-25"
                value={selectedEndDate}
                onChange={(dates: any) => {
                  const selectedEnd = dates[0];

                  if (selectedEnd && selectedEnd < selectedStartDate) {
                    showToast("End Date cannot be before Start Date!"); // Show toast message
                    return; // Prevent setting the End Date if invalid
                  }

                  setEndDate(selectedEnd); // Update End Date if valid
                }}
                options={{
                  dateFormat: "Y-m-d",
                  minDate: selectedStartDate, // Set min date for End Date to Start Date
                }}
                placeholder="Select End Date"
              />
              <button
                type="button"
                className="btn btn-primary d-flex align-items-center"
                onClick={applyDateFilter}
                disabled={showSpinner}
              >
                {showSpinner && (
                  <Spinner size="sm" className="me-2">
                    Loading...
                  </Spinner>
                )}
                Apply
              </button>
            </div>
          )}
          <ToastContainer closeButton={false} limit={1} />
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default Section;
