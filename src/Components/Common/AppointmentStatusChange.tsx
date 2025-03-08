import { useState } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Spinner } from "reactstrap";

const AppointmentConfirmationModal = ({
  isOpen = false,
  toggle,
  onConfirm,
  status,
  isAppointment = false,
  isTransferBarber = false,
  isService = false,
  appointmentId,
}: {
  isOpen: boolean;
  toggle: () => void;
  onConfirm: (appointmentId: string) => Promise<void>; // Ensure onConfirm is async
  status: string;
  isAppointment: boolean;
  isTransferBarber: boolean;
  isService: boolean;
  appointmentId: string;
}) => {
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    setLoading(true); // Show spinner
    try {
      await onConfirm(appointmentId); // Execute confirmation function
    } finally {
      setLoading(false); // Hide spinner after execution
    }
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle} className="appointment-modal" centered backdrop="static">
      <ModalHeader toggle={toggle} className="modal-header">
        <h4 className="modal-title">Confirm {isAppointment ? "Appointment" : "Status Update"}</h4>
      </ModalHeader>
      <ModalBody className="modal-body">
        {isAppointment ? (
          <p className="confirmation-text">Are you sure you want to cancel this appointment?</p>
        ) : isTransferBarber ? (
          <>
            <p className="confirmation-text">
              Are you sure you want to update the status?
              <strong className="status">{status}</strong>?
            </p>
            <p className="note">
              <strong>
                Note: If you transfer this barber from Schedule to Walk-In, it will automatically cancel all future
                appointments.
              </strong>
            </p>
          </>
        ) : isService ? (
          <p className="confirmation-text">
            Are you sure you want to <strong>{status === "true" ? "Activate" : "Deactivate"}</strong> this service?
          </p>
        ) : (
          <p className="confirmation-text">
            Are you sure you want to update the status to <strong className="status">{status}</strong>?
          </p>
        )}
      </ModalBody>
      <ModalFooter className="modal-footer">
        <Button color="success" className="btn-confirm" onClick={handleConfirm} disabled={loading}>
          {loading && <Spinner size="sm" className="me-2" />}
          Confirm
        </Button>
        <Button color="secondary" className="btn-cancel" onClick={toggle} disabled={loading}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default AppointmentConfirmationModal;
