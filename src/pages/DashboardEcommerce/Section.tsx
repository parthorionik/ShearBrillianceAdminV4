import React, { useEffect, useState } from "react";
import { Col, Row, Spinner } from "reactstrap";
import Flatpickr from "react-flatpickr";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "flatpickr/dist/themes/material_blue.css"; // Flatpickr theme
import Loader from "Components/Common/Loader";
import { generatereport } from "Services/Insalonappointment";
import "./section.css"
import { fetchSalons } from "Services/SalonService";
import { fetchBarberBySalon } from "Services/barberService";

const Section = (props: any) => {
  const [userInformation, setUserInformation] = useState<any>(null);
  const [userRole, setUserRole] = useState<any>();
  const [greeting, setGreeting] = useState("");
  const [selectedStartDate, setStartDate] = useState<any>(new Date());
  const [selectedEndDate, setEndDate] = useState<any>(new Date());
  const [showLoader, setShowLoader] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showSpinner, setShowSpinner] = useState<boolean>(false);

 const [salonData, setSalonData] = useState<any[]>([]); // List of all barbers
  const [salonBarberData, setSalonBarberData] = useState<any[]>([]); // Barbers filtered by selected salon
  const [selectedSalonId, setSelectedSalonId] = useState<any | null>(null); // Selected salon
  const [selectedBarberId, setSelectedBarberId] = useState<any | null>(null); // Selected barber
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
    
      const response = await generatereport(
        formatDate(selectedStartDate),
        formatDate(selectedEndDate),
        selectedSalonId || undefined, // Pass salonId if selected, else undefined
        selectedBarberId || undefined // Pass barberId if selected, else undefined
      );
  
      if (response && response.downloadLink) {
        toast.success("PDF sales report generated successfully!");
        window.open(response.downloadLink, "_blank");
      } else {
        toast.error("Failed to generate PDF report.");
      }
    } catch (error: any) {
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error.message || "Something went wrong");
      }
    } finally {
      setShowSpinner(false);
      setShowLoader(false);
      setShowDatePicker(false);
    }
  };
  const showToast = (message: string) => {
    toast.warning(message); // Display warning toast message
  };
 useEffect(() => {
    const fetchAllData = async () => {

      try {
        // Fetch both salons and barbers data in parallel
        const [salonsResponse] = await Promise.all([
          fetchSalons(1, null, null),
        ]);
        // Set the fetched data to the respective states
        setSalonData(salonsResponse?.salons || []);
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

    fetchAllData();
  }, []);

  const formatDate = (dateString: any) => {
    if (!dateString) return ""; // Return an empty string if dateString is invalid

    const date = new Date(dateString);
    if (isNaN(date.getTime())) return ""; // Return an empty string if date is invalid

    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(date.getUTCDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
 const getSalonBabrer = async (salonId: any) => {
    try {
      
      // Fetch barbers for the selected salon
      const barberResponse = await fetchBarberBySalon(salonId, null);
      // Check if the barberResponse itself has data or is not empty
      if (barberResponse && barberResponse.length > 0) {
        const barbers = barberResponse; // Assuming the response is directly the list of barbers
        setSalonBarberData(barbers); // Update barber data
      } else {
        setSalonBarberData([]); // No barbers found, clear barber data
      }
    } catch (error: any) {
      // Check if the error has a response property (Axios errors usually have this)
      if (error.response && error.response.data) {
        const apiMessage = error.response.data.message; // Extract the message from the response
        toast.error(apiMessage || "An error occurred"); // Show the error message in a toaster
      } else {
        // Fallback for other types of errors
        toast.error(error.message || "Something went wrong");
      }
      setSalonBarberData([]); // Clear barber data in case of error
    }
  }
  let storeUserInfo: any;
  const authUSer: any = localStorage.getItem("authUser");
  if (authUSer) {
    storeUserInfo = JSON.parse(authUSer);
  }
  useEffect(() => {
    if (storeUserInfo.berber) {
      setSelectedSalonId(storeUserInfo.berber.SalonId);
      setSelectedBarberId(storeUserInfo.berber.id);
      // setTimeout(() => {
      //   applyDateFilter(
      //     storeUserInfo.berber.SalonId,
      //     storeUserInfo.berber.id
      //   );
      // }, 500);
    }
    if (storeUserInfo.salon) {
      setSelectedSalonId(storeUserInfo.salon.id);
      getSalonBabrer(storeUserInfo.salon.id);
    }
  }, []);
  
    const handleSalonChange = async (
      event: React.ChangeEvent<HTMLSelectElement>
    ) => {
      
  
      const salonId = event.target.value ? Number(event.target.value) : null;
      setSelectedSalonId(salonId);
      if (salonId !== null) {
        getSalonBabrer(salonId);
      } else {
        setSalonBarberData([]); // Clear barbers if no salon is selected
      }
  
      // Clear selected barber when salon changes
      setSelectedBarberId(null);
    };
    // Handle barber change
    const handleBarberChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      
      const barberId = event.target.value ? Number(event.target.value) : null;
      setSelectedBarberId(barberId);
      if (!selectedSalonId) {
        alert("Please select a salon first.");
      }
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
       <div className="row align-items-center mt-3 g-2">
         {/* Salon Dropdown */}
         {!storeUserInfo.berber && !storeUserInfo.salon && (
           <div className="col-lg-3 col-md-6 col-sm-6">
             <select
               id="salonSelect"
               className="form-select"
               value={selectedSalonId !== null ? selectedSalonId : ""}
               onChange={handleSalonChange}
             >
               <option value="" disabled>
                 Select Salon
               </option>
               {salonData.length > 0 ? (
                 salonData.map((salon: any) => (
                   <option key={salon.salon.id} value={salon.salon.id}>
                     {salon.salon.name}
                   </option>
                 ))
               ) : (
                 <option value="" disabled>
                   No salons available
                 </option>
               )}
             </select>
           </div>
         )}
     
         {/* Barber Dropdown */}
         <div className="col-lg-3 col-md-6 col-sm-6">
           <select
             id="barberSelect"
             className="form-select"
             value={selectedBarberId !== null ? selectedBarberId : ""}
             onChange={handleBarberChange}
             disabled={!selectedSalonId}
           >
             <option value="" disabled>
               Select Barber
             </option>
             {salonBarberData.length > 0 ? (
               salonBarberData.map((barber: any) => (
                 <option
                   key={barber.id}
                   value={barber.id}
                   disabled={barber.availability_status !== "available"}
                 >
                   {barber.name}
                 </option>
               ))
             ) : (
               <option value="" disabled>
                 No barbers available
               </option>
             )}
           </select>
         </div>
     
         {/* Start Date Picker */}
         <div className="col-lg-3 col-md-6 col-sm-6">
           <Flatpickr
             className="form-control"
             value={selectedStartDate}
             onChange={(dates: any) => setStartDate(dates[0])}
             options={{ dateFormat: "Y-m-d" ,maxDate: new Date() }}
             placeholder="Select Start Date"
           />
         </div>
     
         {/* End Date Picker + Apply Button */}
         <div className="col-lg-3 col-md-6 col-sm-6 d-flex align-items-center gap-2">
       <div className="flex-grow-1">
         <Flatpickr
           className="form-control"
           value={selectedEndDate}
           onChange={(dates: any) => {
             const selectedEnd = dates[0];
             if (selectedEnd && selectedEnd < selectedStartDate) {
               showToast("End Date cannot be before Start Date!");
               return;
             }
             setEndDate(selectedEnd);
           }}
           options={{
             dateFormat: "Y-m-d",
             minDate: selectedStartDate,
             maxDate: new Date(),
           }}
           placeholder="Select End Date"
         />
       </div>
     
       <button
         type="button"
         className="btn btn-primary"
         onClick={applyDateFilter}
         disabled={showSpinner}
         style={{ whiteSpace: "nowrap" }} // Prevents button text from wrapping
       >
         {showSpinner && <Spinner size="sm" className="me-2">Loading...</Spinner>}
         Apply
       </button>
     </div>
     
       </div>
     )}
      <ToastContainer closeButton={false} limit={1} />
    </Col>
  </Row>
</React.Fragment>
  );
};

export default Section;
