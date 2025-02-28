
import React, { useEffect, useState } from "react";
import { Col, Row, Spinner } from "reactstrap";
import Flatpickr from "react-flatpickr";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "flatpickr/dist/themes/material_blue.css"; // Flatpickr theme
import Loader from "Components/Common/Loader";
import { generateSalesreport } from "Services/Insalonappointment";

const Salesrevenue = () => {
  const [userRole, setUserRole] = useState<any>();
  const [selectedStartDate, setStartDate] = useState<any>(new Date());
  const [selectedEndDate, setEndDate] = useState<any>(new Date());
  const [showLoader, setShowLoader] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showSpinner, setShowSpinner] = useState<boolean>(false);

  useEffect(() => {
    const authUser = localStorage.getItem("authUser");
    if (authUser) {
      const authUserData = JSON.parse(authUser);
      setUserRole(authUserData.user.role);
    }
  }, []);

  const applyDateFilter = async () => {
    setShowSpinner(true);
    setShowLoader(true);
    try {
      const response = await generateSalesreport(formatDate(selectedStartDate), formatDate(selectedEndDate));
      if (response) {
        const downloadLink = response.downloadUrl;
        toast.success("PDF sales report generated successfully!");
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

  const formatDate = (dateString: any) => {
    if (!dateString) return ""; // Return an empty string if dateString is invalid

    const date = new Date(dateString);
    if (isNaN(date.getTime())) return ""; // Return an empty string if date is invalid

    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(date.getUTCDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return (
    <React.Fragment>
      <Row className="mb-3 pb-1">
        <Col xs={12}>
          <div className="d-flex justify-content-end align-items-lg-center flex-lg-row flex-column"> 
            {userRole?.role_name === "Admin" ||
              userRole?.role_name === "Salon Owner" ? (
              <div className="mt-3 mt-lg-0">
                <div className="d-flex justify-content-between align-items-center col-auto p-2 bg-light">
                  <p className="text-uppercase fw-medium text-muted text-truncate mb-0 me-2">
                    Generate Sales Report
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
  )
}

export default Salesrevenue
