import React, { useMemo } from "react";
import { Status } from "../Appointments/AppointmentListCol";
import TableContainer from "Components/Common/TableContainerReactTable";

const CustomerAppointmentList = ({ appointments }: any) => {

  const formatDate = (dateString: any) => {
    if (!dateString) return ""; // Return an empty string if dateString is invalid
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return ""; // Return an empty string if date is invalid
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(date.getUTCDate()).padStart(2, '0');
    return `${day}-${month}-${year}`;
  };

  const columns = useMemo(
    () => [
      {
        header: "Full Name",
        accessorKey: "name",
        cell: (cell: any) => {
          return cell.getValue() ? cell.getValue() : "Unknown"; // Fallback if the barber is not found
        },
        enableColumnFilter: false,
      },
      {
        header: "Barber Name",
        accessorKey: "Barber.name",
        cell: (cell: any) => {
          return cell.getValue() ? cell.getValue() : "Unknown"; // Fallback if the barber is not found
        },
        enableColumnFilter: false,
      },
      {
        header: "Salon Name",
        accessorKey: "salon.name",
        enableColumnFilter: false,
      },
      {
        header: "Date",
        accessorKey: "check_in_time", // Primary key to bind data
        cell: (cell: { row: { original: any } }) => {
          return formatDate(cell.row.original.appointment_date || cell.row.original.check_in_time);
        },
        enableColumnFilter: false,
      },
      // {
      //   header: "Number Of People",
      //   accessorKey: "number_of_people",
      //   cell: (cell: any) => {
      //     return <NumberOfPeople {...cell} />;
      //   },
      //   enableColumnFilter: false,
      // },
      {
        header: "Status",
        accessorKey: "status",
        cell: (cell: any) => {
          return <Status {...cell} />;
        },
        enableColumnFilter: false,
      },

      // {
      //   header: "Queue Position",
      //   accessorKey: "queue_position",
      //   cell: (cell: any) => {
      //     return <Position {...cell} />;
      //   },
      //   enableColumnFilter: false,
      // },
      //  {
      //   header: "Details",
      //   accessorKey: "id",
      //   enableColumnFilter: false,

      //   cell: (cell: { getValue: () => number; row: { original: any } }) => (
      //     <div>
      //       <button
      //         type="button"
      //         className="btn btn-sm btn-light"
      //         onClick={() => handleDetails(cell.row.original)}
      //       >
      //         Details
      //       </button>
      //     </div>
      //   ),
      // },
    ],
    [appointments]
  );
  return (
    <React.Fragment>
      <TableContainer
        columns={columns}
        data={appointments || []}
        isGlobalFilter={true}
        customPageSize={100}
        divClass="table-responsive table-card mb-3"
        tableClass="align-middle table-nowrap mb-0"
        theadClass="table-light text-muted"
        SearchPlaceholder="Search by barber, salon or name"
      />

    </React.Fragment>
  );
};

export default CustomerAppointmentList;
