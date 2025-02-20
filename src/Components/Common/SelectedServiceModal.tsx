import React from "react";
import { Modal, ModalHeader, ModalBody, Button } from "reactstrap";

interface BarberData {
  id: number;
  name: string;
  position: string;
  photo?: string;
  servicesWithPrices: {
    id: number;
    name: string;
    description: string;
    barber_price: number; 
    min_price:number; // Each service has its own price
  }[];  // Services is an array of objects, each with service details
}

interface SelectBarberModalProps {
  isOpen: boolean;
  toggle: () => void;
  barberData: BarberData | null;
  selectedServices: any; // Pass the selected services
  services: any;
  onConfirm: () => void; // Callback when "Confirm" button is clicked
}


const SelectBarberModal: React.FC<SelectBarberModalProps> = ({
  isOpen,
  toggle,
  barberData,
  selectedServices,
  services,
  onConfirm,
}) => {
  
  if (!barberData) return null; // If no barber selected, return null

  return (
    <Modal isOpen={isOpen} toggle={toggle} centered backdrop="static">
      <ModalHeader toggle={toggle}>
        {barberData.name} - {barberData.position}
      </ModalHeader>
      <ModalBody>
        <div className="team-profile-img mb-3">
          <div className="avatar-lg img-thumbnail rounded-circle mx-auto">
            {barberData.photo ? (
              <img
                src={barberData.photo}
                alt={barberData.name}
                className="img-fluid d-block rounded-circle"
                style={{
                  height: "85px",
                  width: "6rem",
                }}
              />
            ) : (
              <div className="avatar-title text-uppercase border rounded-circle bg-light text-primary d-flex justify-content-center align-items-center">
                {barberData.name?.charAt(0)}
                {barberData.name
                  ?.split(" ")
                  .slice(-1)
                  .toString()
                  ?.charAt(0)}
              </div>
            )}
          </div>
        </div>
        <h5>Services </h5>
        <ul>
          {selectedServices?.length > 0 ? (
            selectedServices.map((service: any, index: any) => {
              const servioceData = services?.find(
                (serv: any) => serv.id === service.serviceId
              );
              // Find the corresponding service in barberData.services
              const barberService = barberData?.servicesWithPrices?.find(
                (barberService: any) => barberService.name === service.serviceName
              );
              let price = 0;
              if (barberService) {
                price = barberService.barber_price ? barberService.barber_price : barberService.min_price ? barberService.min_price : 0;
              } else {
                price = servioceData ? servioceData.min_price : 0;
              }
              return (
                <li key={index}>
                  {service.serviceName}
                  {barberService ? (
                    <span>
                      {" "}
                      -<strong>${price}</strong>
                    </span>
                  ) : (
                    <span>
                      {" "}
                      -<strong>${price}</strong>
                    </span>
                  )}
                </li>
              );
            })
          ) : (
            <p>No services available for this barber</p>
          )}
        </ul>

        <div className="d-flex gap-2 justify-content-end mt-4 mb-2">
          <Button color="primary" onClick={onConfirm}>
            Confirm
          </Button>
          <Button color="secondary" onClick={toggle} >
            Close
          </Button>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default SelectBarberModal;
