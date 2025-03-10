import React, {
  useState,
  useEffect,
  useMemo,
  useRef,
} from "react";

import {
  Col,
  Modal,
  ModalBody,
  Row,
  Label,
  Input,
  ModalHeader,
  Form,
  CardBody,
  FormFeedback,
  Spinner,
} from "reactstrap";

// Formik
import * as Yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TableContainer from "Components/Common/TableContainerReactTable";
import { fetchBarberBySalon } from "Services/barberService";
import { fetchSalons } from "Services/SalonService";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import BootstrapTheme from "@fullcalendar/bootstrap";
//import listPlugin from "@fullcalendar/list";
import { createSelector } from "reselect";
import { fetchCalendarAppointments } from "Services/CelenderSchedualService";
import { updateAppointmentStatus } from "Services/AppointmentService";
import { addHaircutDetail } from "Services/HaircutDetails";
import printJS from "print-js";
import Profile from "../../../../assets/images/users/avatar-8.jpg";
import AppointmentConfirmationModal from "Components/Common/AppointmentStatusChange";
import Loader from "Components/Common/Loader";
import { Link } from "react-router-dom";

let eventGuid = 0;
// let todayStr = new Date().toISOString().replace(/T.*$/, ""); // YYYY-MM-DD of today

export function createEventId() {
  return String(eventGuid++);
}

//Import Breadcrumb
interface CardData {
  id?: string;
  kanId?: string;
  title?: string;
  cardId?: string;
  botId?: any;
  check_in_time?: any;
  complete_time?: any;
  in_salon_time?: any;
  cancel_time?: any;
  text?: string;
  haircutDetails?: any[];
  Services?: any[];
  userImages?: any[];
  badgeColor?: string;
}

const CalenderScheduleInfo: React.FC = () => {
  const [event, setEvent] = useState<any>({});
  const [modal, setModal] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isEditButton, setIsEditButton] = useState<boolean>(true);
  const [showLoader, setShowLoader] = useState(true);
  const [deleteEvent, setDeleteEvent] = useState<string>("");
  const [eventName, setEventName] = useState<string>("");

  const [appointments, setAppointments] = useState<any>([]);
  const [isSearchClicked, setIsSearchClicked] = useState(false); // Track the button click
  const calendarRef = useRef<FullCalendar | null>(null); // Specify FullCalendar type
  const [startDate, setStartDate] = useState(null); // Use your date logic here
  const [endDate, setEndDate] = useState(null); // Use your date logic here
  const [search, setSearch] = useState(""); // Default empty search
  const [cardhead, setCardHead] = useState<any>();
  const [modall, setModall] = useState<boolean>(false);
  const [isView, setIsView] = useState<boolean>(false);
  const [salonData, setSalonData] = useState<any[]>([]); // List of all barbers
  const [salonBarberData, setSalonBarberData] = useState<any[]>([]); // Barbers filtered by selected salon
  const [selectedSalonId, setSelectedSalonId] = useState<number | null>(null); // Selected salon
  const [selectedBarberId, setSelectedBarberId] = useState<number | null>(null); // Selected barber
  const [weekendsVisible, setWeekendsVisible] = useState(true);
  const [currentEvents, setCurrentEvents] = useState([]);
  const [selectedHairCutDetails, setSelectedHairCutDetails] = useState<any>();
  const [visibleRange, setVisibleRange] = useState({ start: null, end: null });
  const [isFetching, setIsFetching] = useState(false); // Add a flag to prevent multiple API calls
  const [currentView, setCurrentView] = useState("dayGridMonth"); // Track current date
  const [showSpinner, setShowSpinner] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [previousOption, setPreviousOption] = useState("");
  const [appointmentId, setAppointmentId] = useState<any>();

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    setSelectedStatus(previousOption);
  }

  const userRole = localStorage.getItem("userRole");
  let storeRoleInfo: any;
  if (userRole) {
    storeRoleInfo = JSON.parse(userRole);
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
      setTimeout(() => {
        filterAppointment(
          storeUserInfo.berber.SalonId,
          storeUserInfo.berber.id
        );
      }, 500);
    }
    if (storeUserInfo.salon) {
      setSelectedSalonId(storeUserInfo.salon.id);
      getSalonBabrer(storeUserInfo.salon.id);
    }
  }, []);

  const filterAppointment = async (salonId?: any, barberId?: any) => {
    setShowSpinner(true);
    salonId = selectedSalonId ?? salonId;
    barberId = selectedBarberId ?? barberId;
    if (!salonId || !barberId) {
      toast.error("Please select both a salon and a barber."); // Show error toast if salon or barber not selected
      setShowSpinner(false);
      return;
    }

    try {
      await fetchAppointments(salonId, barberId, startDate, endDate);
      setIsSearchClicked(true); // Set the button click state to true

      // Pass both salonId and barberId
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  const getSalonBabrer = async (salonId: any) => {
    try {
      // Fetch barbers for the selected salon
      const barberResponse = await fetchBarberBySalon(salonId, 1);
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
  const fetchAppointments = async (
    salonId: number,
    barberId: number,
    startDate: string | null,
    endDate: string | null
  ) => {
    try {
      setShowLoader(true);
      setIsFetching(true); // Set fetching flag
      const params = {
        salonId,
        barberId,
        startDate: startDate || visibleRange.start || undefined,
        endDate: endDate || visibleRange.end || undefined,
        search: search || undefined,
      };

      const response: any = await fetchCalendarAppointments(params);
      if (response) {
        setShowLoader(false);
        setShowSpinner(false);
        const formattedAppointments = response.map((appointment: any) => {
          const { appointment_date, time_slot, Services, User } = appointment;
          return {
            date: appointment.appointment_date,
            id: appointment.id,
            title: `${User.firstname} ${User.lastname} `,
            start: `${appointment_date}T${time_slot.start}`, // ISO string
            end: `${appointment_date}T${time_slot.end}`, // ISO string
            extendedProps: {
              // username: `${User.firstname} ${User.lastname}`,
              username: `${appointment.name}`,
              user: User,
              services: Services,
              barber: appointment.Barber.name,
              background_color: appointment.Barber.background_color,
              // barber_bg_color: appointment.barber.background_color,
              salon: appointment.salon.name,
              queue_position: appointment.queue_position,
              number_of_people: appointment.number_of_people,
              mobile_number: appointment.mobile_number,
              estimated_wait_time: appointment.estimated_wait_time,
              status: appointment.status,
              text: "",
              userImages: [
                {
                  id: User.id,
                  img: User.img ?? Profile,
                },
              ],
              haircutDetails: appointment.haircutDetails,
              paymentDetails: appointment.paymentDetails,
              paymentStatus: appointment.paymentStatus,
              paymentMode: appointment.paymentMode
            },
          };
        });

        // Update the state without triggering handleDatesSet again
        setAppointments(formattedAppointments);
        // Force FullCalendar to refresh after data update
        // Access FullCalendar's API using the ref
        const calendarApi = calendarRef.current?.getApi();
        if (calendarApi) {
          calendarApi.refetchEvents(); // Ensure the calendar refreshes events
        }

        setTimeout(() => {
          setIsFetching(false); // Reset fetching flag
        }, 500);
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
    }
  };

  // Re-run when these values change
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

  /**
   * Handling the modal state
   */
  const toggle = () => {
    if (modal) {
      setModal(false);
      setEvent(null);
      setIsEdit(false);
      setIsEditButton(true);
      setSelectedStatus("");
      setPreviousOption("");
      setEventName("");
      setDeleteEvent("");
      stopAllProcesses();
      restoreFullCalendarPopovers(); // Force FullCalendar to regenerate popovers
    } else {
      setModal(true);
    }
  };

  const handleOpen = () => {
    setModall(!modall);
    setCardHead(null);
    setIsView(false);
  };

  const str_dt = function formatDate(date: any) {
    var monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    var d = new Date(date),
      month = "" + monthNames[d.getMonth()],
      day = "" + d.getDate(),
      year = d.getFullYear();
    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;
    return [day + " " + month, year].join(",");
  };

  const handleDatesSet = async (dateInfo: any) => {
    setShowLoader(true);
    const { start, end, view } = dateInfo;

    const startDate = start.toISOString().split("T")[0]; // Format as YYYY-MM-DD
    const endDate = end.toISOString().split("T")[0];

    setCurrentView(view.type); // Track the current view
    if (selectedSalonId && selectedBarberId) {
      await fetchAppointments(
        selectedSalonId,
        selectedBarberId,
        startDate,
        endDate
      );
    } else {
      setShowLoader(false);
    }
  };

  let lastClickedEvent: HTMLElement | null = null;
  let removePopoverTimeout: NodeJS.Timeout | null = null;
  let observer: MutationObserver | null = null;
  let abortController: AbortController | null = null;

  // Function to restore popover
  const restoreFullCalendarPopovers = () => {
    setTimeout(() => {
      cancelPopoverRemoval(); // Stop any pending popover removals
      const popovers = document.querySelectorAll(".fc-popover");

      if (popovers.length === 0 && lastClickedEvent) {
        console.log("No popovers found. Re-triggering event click...");
        lastClickedEvent.click(); // Simulate clicking the event again
      }
    }, 200); // Short delay to allow modal closing
  };

  // Function to remove `.fc-popover` elements
  const removeFullCalendarPopovers = () => {
    // Ensure abortController is defined
    if (!abortController) {
      abortController = new AbortController();
    }

    // If the signal is already aborted, return
    if (abortController.signal.aborted) return;

    setTimeout(() => {
      document.querySelectorAll(".fc-popover").forEach((el) => el.remove());
    }, 200);
  };

// Function to cancel popover removal (call when clicking another event)
const cancelPopoverRemoval = () => {
  if (abortController) {
    abortController.abort(); // Stop any pending popover removal
    abortController = new AbortController(); // Reset it for future use
  }
};

  // Stop all background processes when closing modal
  const stopAllProcesses = () => {
    if (removePopoverTimeout) {
      clearTimeout(removePopoverTimeout);
      removePopoverTimeout = null;
    }

    if (abortController) {
      abortController.abort();
      abortController = null;
    }

    if (observer) {
      observer.disconnect();
      observer = null;
    }
  };
  const handleEventClick = (arg: any) => {
    cancelPopoverRemoval(); // Stop previous popover removal process
    // Ensure old popovers are removed
    removeFullCalendarPopovers();

    const event = arg.event;
    const st_date = event.start;
    const ed_date = event.end;
    const r_date =
      ed_date == null
        ? str_dt(st_date)
        : str_dt(st_date) + " to " + str_dt(ed_date);
    const er_date = ed_date === null ? [st_date] : [st_date, ed_date];
    setEvent({
      id: event.id,
      title: event.title,
      start: event.start,
      end: event.end,
      className: event.classNames,
      category: event.classNames[0],
      location: event._def.extendedProps.location || "No Location",
      description: event._def.extendedProps.description,
      defaultDate: er_date,
      datetag: r_date,
      services: event._def.extendedProps.services,
      status: event._def.extendedProps.status,
      barber: event._def.extendedProps.barber,
      background_color: event._def.extendedProps.background_color,
      user: event._def.extendedProps.user,
      username: event._def.extendedProps.username,
      // barber_bg_color: appointment.barber.background_color,
      salon: event._def.extendedProps.salon,
      paymentDetails: event._def.extendedProps.paymentDetails,

      queue_position: event._def.extendedProps.queue_position,
      number_of_people: event._def.extendedProps.number_of_people,
      mobile_number: event._def.extendedProps.mobile_number,
      estimated_wait_time: event._def.extendedProps.estimated_wait_time,
      userImages: event._def.extendedProps.userImages,
      // text: "",
      // userImages: [
      //   {
      //     id: appointment.User.id,
      //     img: appointment.User.profile_photo ?? Profile,
      //   },
      // ],
      haircutDetails: event._def.extendedProps.haircutDetails,
      // paymentDetails: event._def.extendedProps.paymentDetails,
      paymentStatus: event._def.extendedProps.paymentStatus,
      paymentMode: event._def.extendedProps.paymentMode,
    });
    setSelectedStatus(event._def.extendedProps.status);
    setPreviousOption(event._def.extendedProps.status);
    setEventName(event.title);
    setDeleteEvent(event.id);
    setIsEdit(true);
    setIsEditButton(false);
    setTimeout(() => {
      toggle();
    }, 100);

    // Create MutationObserver
    const observer = new MutationObserver(() => {
      removeFullCalendarPopovers();
    });

    // Observe DOM changes
    observer.observe(document.body, { childList: true, subtree: true });

    // Store observer reference to prevent multiple observers
    if ((window as any).currentObserver) {
      (window as any).currentObserver.disconnect();
    }
    (window as any).currentObserver = observer;

    // Cancel any pending popover removals
    if (removePopoverTimeout) {
      clearTimeout(removePopoverTimeout);
      removePopoverTimeout = null;
    }

    if (abortController) {
      abortController.abort(); // Stop removal if another event is clicked
    }

    // Store the last clicked event
    lastClickedEvent = arg.el;
  };

  // Set user data for editing
  const handleDetails = (details: any) => {
    handleOpen();
    setIsView(true); // Toggle edit mode
    setSelectedHairCutDetails(details);
    // setSelectedSalonId(barber.SalonId);
    // setSelectedImage(barber.photo ?? Profile); // Use user's profile image or default
    // setNewBarber(barber); // Set the user to be updated
    // toggleModal(); // Open the modal for editing
  };

  const handlePrint = () => {
    printJS({
      printable: "printArea", // The ID of the element to print
      type: "html",
    });
  };

  const haircutFormik: any = useFormik({
    enableReinitialize: true,

    initialValues: {
      appointment_id: (event?.id && parseInt(event?.id)) || null,
      user_id: (event?.user && event?.user?.id) || null,
      customer_notes:
        (selectedHairCutDetails && selectedHairCutDetails.customer_notes) || "",
      haircut_style:
        (selectedHairCutDetails && selectedHairCutDetails.haircut_style) || "",
      product_used:
        (selectedHairCutDetails && selectedHairCutDetails.product_used) || "",
      barber_notes:
        (selectedHairCutDetails && selectedHairCutDetails.barber_notes) || "",
    } as CardData,
    validationSchema: Yup.object({
      customer_notes: Yup.string().required("Please Enter Your Customer Notes"),
      haircut_style: Yup.string().required("Please Enter Your Haircut Style"),
      product_used: Yup.string().required("Please Enter Your Product Used"),
      barber_notes: Yup.string().required("Please Enter your Barber Notes"),
    }),
    onSubmit: async (values: any) => {
      try {
        const newHaircutDetails = await addHaircutDetail({ ...values });
        haircutFormik.resetForm();
        haircutToggle();
        event?.haircutDetails.push(newHaircutDetails);
        toast.success("Haircut details added successfully", {
          autoClose: 3000,
        });
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
    },
  });

  const haircutToggle = () => {
    if (modall) {
      setModall(false);
      setCardHead(null);
    } else {
      setModall(true);
    }
  };
  const columns = useMemo(
    () => [
      {
        header: "Style",
        accessorKey: "haircut_style",
        enableColumnFilter: false,
      },
      {
        header: "Barber notes",
        accessorKey: "barber_notes", // Add SalonId column for "Salon Name"
        enableColumnFilter: false,
      },
      {
        header: "Product used",
        accessorKey: "product_used",
        enableColumnFilter: false,
      },
      {
        header: "Customer notes",
        accessorKey: "customer_notes",
        enableColumnFilter: false,
      },
      {
        header: "Actions",
        accessorKey: "id",
        enableColumnFilter: false,

        cell: (cell: { getValue: () => number; row: { original: any } }) => (
          <div>
            <button
              type="button"
              className="btn btn-sm btn-light me-2"
              onClick={() => handleDetails(cell.row.original)}
            >
              Details
            </button>
          </div>
        ),
      },
    ],
    []
  );

  // useEffect(() => {
  //     if (appointmentInfo?.status) {
  //       setSelectedStatus(appointmentInfo.status.toLowerCase());
  //     }
  //   }, [appointmentInfo]);

  const handleStatusChange = (newStatus: string) => {
    toggleModal(); // Open the confirmation modal
    setPreviousOption(selectedStatus);
    setSelectedStatus(newStatus); // Set the new status
    setAppointmentId(event.id); // Store the appointment ID for modal
  };

  const confirmStatusChange = async () => {
    try {
      
      if (appointmentId) {
        setShowSpinner(true);
        await updateAppointmentStatus(appointmentId, {
          status: selectedStatus,
        }); // API call to update status
        setShowSpinner(false);
        toggle();
        toggleModal(); // Close the modal
        filterAppointment();
        toast.success("Status updated successfully", { autoClose: 3000 });
        // Update the specific appointment in local state after a successful API call
        // setAppointments((prevAppointments: any[]) => {
        //   return prevAppointments.map((appointment) => {
        //     return appointment.id === appointmentId
        //       ? { ...appointment, status: selectedStatus }
        //       : appointment;
        //   });
        // });
      }
    } catch (error) {
      console.error("Failed to update appointment:", error);
      // Optionally show error message
      // alert("Error updating status. Please try again.");
    }
  };

  return (
    <React.Fragment>
      <div className="row">
        <Col lg={12}>
          <div className="card" id="tasksList">
            <div className="card-header border-0">
              <div className="d-flex align-items-center justify-content-between">
                <h5 className="card-title mb-0 flex-grow-3">
                  Future Appointments Schedule
                </h5>
              </div>

              {/* Dropdowns container moved to left side */}
              {!storeUserInfo.berber && (
                <div className="row mt-4 d-flex align-items-center">
                  {/* Dropdown for selecting Salon */}
                  {!storeUserInfo.salon && (
                    <div className="col-sm-3 col-3 custom-align">
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

                      {/* Instructional Text Below the Salon Dropdown */}
                      {/* <div className="mt-2">
                        {selectedSalonId === null ? (
                          <p className="text-muted">
                            Please select a salon to view available barbers.
                          </p>
                        ) : (
                          <p className="text-muted">
                            Now, select a barber from the next dropdown.
                          </p>
                        )}
                      </div> */}
                    </div>
                  )}

                  {/* Dropdown for selecting Barber */}
                  <div className={!storeUserInfo.salon ? "col-sm-3 col-3" : "col-sm-6 col-md-6 col-lg-6 col-xl-9 col-xxl-6 col-8"}>                    <select
                    id="barberSelect"
                    className="form-select"
                    value={selectedBarberId !== null ? selectedBarberId : ""}
                    onChange={handleBarberChange}
                    disabled={!selectedSalonId} // Disable barber dropdown if no salon is selected
                  >
                    <option value="" disabled>
                      Select Barber
                    </option>
                    {salonBarberData.length > 0 ? (
                      salonBarberData.map((barber: any) => (
                        <option key={barber.id} value={barber.id} disabled={barber.availability_status !== 'available'}>
                          {barber.name}
                        </option>
                      ))
                    ) : (
                      <option value="" disabled>
                        No barbers available
                      </option>
                    )}
                  </select>

                    {/* Instructional Text Below the Barber Dropdown */}
                    {/* <div className="mt-2">
                      {selectedSalonId === null ? (
                        <p className="text-muted">
                          Please select a salon first.
                        </p>
                      ) : selectedBarberId === null ? (
                        <p className="text-muted">Please select a barber.</p>
                      ) : (
                        <p className="text-muted">
                          Barber selected. You can now proceed to book
                          appointments.
                        </p>
                      )}
                    </div> */}
                  </div>

                  {/* Search Button */}
                  <div className={!storeUserInfo.salon ? "col-sm-2 col-4" : "col-sm-4 col-md-3 col-lg-3 col-xl-3 col-xxl-3 col-6"}>
                    <button
                      type="button"
                      className="btn btn-primary"
                      style={{width : "126px"}}
                      id="btn-delete-event"
                      onClick={filterAppointment}
                      disabled={showSpinner} // Disable button when loader is active
                    >
                      {showSpinner && (
                        <Spinner size="sm" className="me-2">
                          Loading...
                        </Spinner>
                      )}
                      <i className="ri-search-line align-bottom"></i> Search
                    </button>

                    {/* Conditional Message Based on Button Click */}
                    {/* <div className="mt-2">
                      {isSearchClicked ? (
                        <p className="text-muted">Searched</p>
                      ) : (
                        <p className="text-muted">
                          Click to filter appointments.
                        </p>
                      )}
                    </div> */}
                  </div>
                </div>
              )}
            </div>

            <CardBody>
              <div className="demo-app-main">
                {showLoader && <Loader />}
                <FullCalendar
                  ref={calendarRef}
                  // key={appointments?.length} // Changes key when appointments array updates
                  plugins={[
                    BootstrapTheme,
                    dayGridPlugin,
                    timeGridPlugin,
                    interactionPlugin,
                  ]}
                  headerToolbar={{
                    left: "prev,next today",
                    center: "title",
                    right: "dayGridMonth,timeGridWeek,timeGridDay",
                  }}
                  initialView={currentView} // Control the current view
                  editable={true}
                  selectable={true}
                  dayMaxEvents={true}
                  themeSystem="bootstrap"
                  datesSet={handleDatesSet} // This gets the visible date range
                  weekends={weekendsVisible}
                  events={appointments} // Bind new events here
                  eventContent={renderEventContent}
                  eventClick={handleEventClick}
                  eventsSet={handleEvents}
                  slotDuration="00:15:00" // Set time slots to 15-minute intervals
                  slotLabelInterval="00:15:00" // Show labels for each 15-minute interval
                  slotLabelFormat={{
                    hour: "2-digit",
                    minute: "2-digit",
                    meridiem: "short",
                  }}
                  slotMinTime="08:00:00" // Start time at 8 AM
                  slotMaxTime="21:00:00" // End time at 9 PM
                // contentHeight="auto" // Adjust height dynamically
                />
              </div>
            </CardBody>
          </div>
        </Col>
        <div style={{ clear: "both" }}></div>

        <Modal
          id="modalForm"
          isOpen={modal}
          toggle={toggle}
          centered={true}
          backdrop="static"
          size="lg"
        >
          <ModalHeader toggle={toggle}>Appointment Details</ModalHeader>
          <ModalBody>
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                return false;
              }}
            >
              <div className="row">
                {/* Left Section: Image */}
                <div className="col-lg-4 d-flex justify-content-center align-items-center">
                  <div className="text-left">
                    <div className="position-relative d-inline-block">
                      <div className="avatar-lg">
                        <div
                          className="avatar-title bg-light rounded-circle"
                          style={{
                            width: "100px",
                            height: "100px",
                            overflow: "hidden",
                          }}
                        >
                          {event?.userImages?.map((picturedata: any, idx: any) => (
                            <img
                              key={idx}
                              src={picturedata.img}
                              alt="User"
                              className="rounded-circle img-fluid"
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Section: Fields and Labels */}
                <div className="col-lg-8">
                  <div className="form-group py-2 border-bottom">
                    <b>User Name: </b>
                    <span>{event?.username || "N/A"}</span>
                  </div>
                  <div className="form-group py-2 border-bottom">
                    <b>Salon Name: </b>
                    <span>{event?.salon || "N/A"}</span>
                  </div>
                  <div className="form-group py-2 border-bottom">
                    <b>Barber Name: </b>
                    <span>{event?.barber || "N/A"}</span>
                  </div>
                  <div className="form-group py-2 border-bottom">
                    <b>Mobile Number: </b>
                    <span>{event?.mobile_number || "N/A"}</span>
                  </div>
               
                  
                  <div className="form-group py-2 border-bottom">
                    <b>Services: </b>
                    <span>
                      {event?.services?.length > 0 ? (
                        event.services.map((element: any, idx: any) => (
                          <span key={idx}>
                            {idx > 0 && <span>, </span>}
                            {element.name}
                          </span>
                        ))
                      ) : (
                        <span className="text-muted">
                          <i>No data found</i>
                        </span>
                      )}
                    </span>
                  </div>
                  <div className="form-group py-2 border-bottom d-flex">
                    <div style={{width: "50%"}} >
                      <b>Total Amount: </b>
                    <span>{event?.paymentDetails?.totalAmount || "N/A"}</span>
                    </div>
                    <div style={{width: "50%"}}>
                      <b>Tip: </b>
                    <span>{event?.paymentDetails?.tip || "N/A"}</span>
                    </div>
                    
                  </div>
                </div>
              </div>
              <div>
                <div className="flex-grow-1">
                  <b>Payment:</b>
                  <b
                    className="px-2 py-1"
                    style={{
                      color: event?.paymentStatus?.toLowerCase() === 'success' ? 'green' : 'red',
                    }}
                  >
                    {event?.paymentStatus ?? 'Pending'}
                  </b>
                  {
                    event?.paymentStatus?.toLowerCase() === 'success' && event?.paymentMode !== "Pay_In_Person" && (
                      <Link
                        to={event?.paymentDetails?.receiptUrl}
                        target="_blank"
                        className="btn btn-warning p-0 px-2"
                        data-tooltip-id="download-tooltip"
                        data-tooltip-content="Download Receipt"
                        onClick={() => handlePrint()}
                      >
                        <i className="ri-download-line"></i> Receipt
                      </Link>
                    )
                  }
                </div>
              </div>
              {/* Status Dropdown */}
              <div className="row my-4">
                {/* Status Dropdown */}
                <div className="col-lg-6 d-flex align-items-center justify-content-start">
                  <label htmlFor="statusSelect" className="mb-2">
                    Status
                  </label>

                  <select
                    id="statusSelect"
                    className="form-select ms-2"
                    value={selectedStatus}
                    onChange={(e) => handleStatusChange(e.target.value)}
                    disabled={event?.status === "completed" || event?.status === "canceled"}
                    style={{
                      color:
                        selectedStatus === "completed"
                          ? "green"
                          : selectedStatus === "canceled"
                            ? "red"
                            : "orange",
                      fontWeight: "bold",
                      width:"auto"
                      
                    }}
                  >
                    <option
                      value="appointment"
                      disabled={selectedStatus === "appointment"}
                      style={{ color: "orange", fontWeight: "bold" }}
                    >
                      Appointment
                    </option>
                    <option
                      value="completed"
                      disabled={selectedStatus === "completed"}
                      style={{ color: "green", fontWeight: "bold" }}
                    >
                      Completed
                    </option>
                    <option
                      value="canceled"
                      disabled={selectedStatus === "canceled"}
                      style={{ color: "red", fontWeight: "bold" }}
                    >
                      Canceled
                    </option>
                  </select>

                  <AppointmentConfirmationModal
                    isOpen={isModalOpen}
                    toggle={toggleModal}
                    onConfirm={confirmStatusChange}
                    status={selectedStatus}
                    isAppointment={false}
                    isTransferBarber={false}
                    isService={false}
                    appointmentId={appointmentId}
                    showSpinner={showSpinner}
                  />
                </div>

                {/* Haircut Details Button */}
                <div className="col-lg-6 d-flex align-items-center justify-content-end mb-4">
                  <button
                    className="btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#createboardModal"
                    onClick={handleOpen}
                  >
                    <i className="ri-add-line align-bottom me-1" style={{ marginTop: "30px" }}></i> Add Haircut Details
                  </button>
                </div>
              </div>

              {event?.haircutDetails?.length ? (
                <TableContainer
                  columns={columns}
                  data={event.haircutDetails}
                  isGlobalFilter={true}
                  customPageSize={10}
                  divClass="table-responsive table-card"
                  SearchPlaceholder="Search..."
                />
              ) : (
                <div>No Haircut Data Available</div>
              )}
            </Form>
          </ModalBody>
        </Modal>


        <Modal
          isOpen={modall}
          toggle={handleOpen}
          centered={true}
          backdrop="static"
          size="lg"
        >
          <div className="modal-content border-0">
            <ModalHeader toggle={handleOpen}>
              {isView ? "" : "Add Haircut Details"}
            </ModalHeader>
            <ModalBody>
              <Form
                onSubmit={(event: any) => {
                  event.preventDefault();
                  haircutFormik.handleSubmit();
                  return false;
                }}
              >
                <Row>
                  {!isView ? (
                    <>
                      <div className="form-group mb-3">
                        <Label
                          htmlFor="haircut_style"
                          className="col-form-label"
                        >
                          Haircut style
                        </Label>
                        <Col lg={12}>
                          <Input
                            id="haircut_style"
                            type="text"
                            placeholder="Enter Haircut Style"
                            onChange={haircutFormik.handleChange}
                            onBlur={haircutFormik.handleBlur}
                            value={haircutFormik.values?.haircut_style}
                            className={
                              haircutFormik.touched?.haircut_style &&
                                haircutFormik.errors?.haircut_style
                                ? "is-invalid"
                                : ""
                            }
                          />
                          {haircutFormik.touched?.haircut_style &&
                            haircutFormik.errors?.haircut_style && (
                              <div className="invalid-feedback">
                                {/* {typeof formik.errors.haircut_style === "string"
                              ? formik.errors.haircut_style
                              : ""} */}
                              </div>
                            )}
                        </Col>
                      </div>
                      <div className="form-group mb-3">
                        <label className="col-form-label">Customer Note</label>
                        <Col lg={12}>
                          <textarea
                            id="customer_notes"
                            className="form-control"
                            placeholder="Enter Task Description"
                            name="customer_notes"
                            onChange={haircutFormik.handleChange}
                            onBlur={haircutFormik.handleBlur}
                            value={haircutFormik.values?.customer_notes || ""}
                          ></textarea>
                          {haircutFormik.touched?.customer_notes &&
                            haircutFormik.errors?.customer_notes ? (
                            <FormFeedback type="invalid" className="d-block">
                              {haircutFormik.errors?.customer_notes}
                            </FormFeedback>
                          ) : null}
                        </Col>
                      </div>
                      <div className="form-group mb-3">
                        <label className="col-form-label">Barber Note</label>
                        <Col lg={12}>
                          <textarea
                            id="barber_notes"
                            className="form-control"
                            placeholder="Enter Task Description"
                            name="barber_notes"
                            onChange={haircutFormik.handleChange}
                            onBlur={haircutFormik.handleBlur}
                            value={haircutFormik.values?.barber_notes || ""}
                          ></textarea>
                          {haircutFormik.touched?.barber_notes &&
                            haircutFormik.errors?.barber_notes ? (
                            <FormFeedback type="invalid" className="d-block">
                              {haircutFormik.errors?.barber_notes}
                            </FormFeedback>
                          ) : null}
                        </Col>
                      </div>
                      <div className="form-group mb-3">
                        <Label
                          htmlFor="product_used"
                          className="col-form-label"
                        >
                          Product Used
                        </Label>
                        <Col lg={12}>
                          <Input
                            id="product_used"
                            type="text"
                            placeholder="Enter Product Used"
                            onChange={haircutFormik.handleChange}
                            onBlur={haircutFormik.handleBlur}
                            value={haircutFormik.values?.product_used}
                            className={
                              haircutFormik.touched?.product_used &&
                                haircutFormik.errors?.product_used
                                ? "is-invalid"
                                : ""
                            }
                          />
                          {haircutFormik.touched?.product_used &&
                            haircutFormik.errors?.product_used && (
                              <div className="invalid-feedback">
                                {/* {typeof formik.errors.product_used === "string"
                                ? formik.errors.product_used
                                : ""} */}
                              </div>
                            )}
                        </Col>
                      </div>
                    </>
                  ) : (
                    <div id="printArea">
                      <table
                        style={{
                          border: "1px solid black",
                          width: "100%",
                        }}
                      >
                        <thead>
                          <tr>
                            <th
                              colSpan={2}
                              style={{
                                border: "1px solid black",
                                backgroundColor: "#f8f9fa",
                                textAlign: "center",
                                padding: "8px",
                              }}
                            >
                              Haircut Details
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <th
                              style={{
                                border: "1px solid black",
                                textAlign: "left",
                                padding: "8px",
                              }}
                            >
                              Haircut Style
                            </th>
                            <td
                              style={{
                                border: "1px solid black",
                                textAlign: "left",
                                padding: "8px",
                              }}
                            >
                              {haircutFormik.values?.haircut_style}
                            </td>
                          </tr>
                          <tr>
                            <th
                              style={{
                                border: "1px solid black",
                                textAlign: "left",
                                padding: "8px",
                              }}
                            >
                              Customer Note
                            </th>
                            <td
                              style={{
                                border: "1px solid black",
                                textAlign: "left",
                                padding: "8px",
                              }}
                            >
                              {haircutFormik.values?.customer_notes}
                            </td>
                          </tr>
                          <tr>
                            <th
                              style={{
                                border: "1px solid black",
                                textAlign: "left",
                                padding: "8px",
                              }}
                            >
                              Barber Note
                            </th>
                            <td
                              style={{
                                border: "1px solid black",
                                textAlign: "left",
                                padding: "8px",
                              }}
                            >
                              {haircutFormik.values?.barber_notes}
                            </td>
                          </tr>
                          <tr>
                            <th
                              style={{
                                border: "1px solid black",
                                textAlign: "left",
                                padding: "8px",
                              }}
                            >
                              Product Used
                            </th>
                            <td
                              style={{
                                border: "1px solid black",
                                textAlign: "left",
                                padding: "8px",
                              }}
                            >
                              {haircutFormik.values?.product_used}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  )}
                  <div className="mt-4">
                    <div className="hstack gap-2 justify-content-end">
                      <button
                        type="button"
                        className="btn btn-light"
                        data-bs-dismiss="modal"
                        onClick={handleOpen}
                      >
                        Close
                      </button>
                      {isView && (
                        <button
                          type="button"
                          className="btn btn-light"
                          onClick={() => handlePrint()}
                        >
                          <i className="ri-printer-line"></i> Print
                        </button>
                      )}
                      {!isView ? (
                        <button
                          type="submit"
                          className="btn btn-success"
                          id="addNewBoard"
                        >
                          Save
                        </button>
                      ) : null}
                    </div>
                  </div>
                </Row>
              </Form>
            </ModalBody>
          </div>
        </Modal>
      </div>
    </React.Fragment>
  );

  function handleEvents(events: any) {
    setCurrentEvents(events);
  }

  function renderEventContent(eventInfo: any) {
    const startTime = eventInfo.event.start;
    const endTime = eventInfo.event.end;

    // Format the start and end times as needed
    const formattedStartTime = startTime
      ? startTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      : "";
    const formattedEndTime = endTime
      ? endTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      : "";
    return (
      <>
        <b>
          {formattedStartTime} - {formattedEndTime}
        </b>
        <i
          style={{
            whiteSpace: "normal",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {`,${eventInfo.event.title}`}
        </i>
      </>
    );
  }
};

export default CalenderScheduleInfo;
