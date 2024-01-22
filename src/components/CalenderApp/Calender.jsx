// import React, { useState,useEffect } from 'react';
// import Fullcalender from './Fullcalender';
// const Calender = () => {
//   const [events, setEvents] = useState([]);
//   const addEvent = (eventName, eventStart, eventEnd) => {
//     const newEvent = {
//       title: eventName,
//       start: eventStart,
//       end: eventEnd,
//       description: 'New Lecture',
//       resourceId: 'a',
//     };

//     setEvents((prevEvents) => [...prevEvents, newEvent]);
    

//   };

//   const addEvent22 = (pName, es, e1) => {
//     const newEvent = {
//       title: pName,
//       start: es,
//       end: e1,
//       description: 'New Lecture',
//       resourceId: 'b',
//     };
     
//     setEvents((prevEvents) => [...prevEvents, newEvent]);
  
//   };

//   const toggleEventForm = () => {
//     const eventForm = document.getElementById('eventForm');
//     eventForm.style.display = eventForm.style.display === 'none' ? 'block' : 'none';
//   };

//   const toggleForm = () => {
//     const eventt = document.getElementById('eventt');
//     eventt.style.display = eventt.style.display === 'none' ? 'block' : 'none';
//   };

//   useEffect(() => {
//     console.log(events,'calender events'); 
//   }, [events]);
  

//   return (
//     <div>
     

//       <button onClick={() => changeView('resourceTimeGridWeek')}>Week View</button>

//       <button onClick={toggleEventForm} id="ss">
//         Doctor details
//       </button>
//       <button onClick={toggleForm} id="ss1">
//         Patient details
//       </button>

//       <form id="eventForm" style={{ display: 'none' }}>
//         <label htmlFor="eventName">Doctor Name:</label>
//         <input type="text" id="eventName" name="eventName" required />
//         <label htmlFor="eventStart">Date-time:</label>
//         <input type="datetime-local" id="eventStart" name="Date-time" />
//         <label htmlFor="eventEnd">Date-time:</label>
//         <input type="datetime-local" id="eventEnd" name="eventEnd" required />
//          <button
//           type="button"
//           onClick={() =>
    
//           addEvent(
//             document.getElementById('eventName').value,
//              document.getElementById('eventStart').value,
//                document.getElementById('eventEnd').value
//              ) 
//           }
//         >
//           Add Event
//         </button> 
       
  
//       </form>

//       <form id="eventt" style={{ display: 'none' }}>
//         <label htmlFor="pName">Patient Name:</label>
//         <input type="text" id="pName" name="patientName" required />
//         <label htmlFor="es">Event Start:</label>
//         <input type="datetime-local" id="es" name="eventStart" required />
//         <label htmlFor="e1">Event End:</label>
//         <input type="datetime-local" id="e1" name="eventEnd" required />
//         <label htmlFor="er">Event Resource:</label>
         
//          <button
//           type="button"
//           onClick={() =>
//             addEvent22(
//               document.getElementById('pName').value,
//               document.getElementById('es').value,
//               document.getElementById('e1').value
//             )
//           }
//         >
//           Add Event 
//         </button> 
        

//       </form>

//       <Fullcalender events={events} addEvent={addEvent} addEvent22={addEvent22} />
       
//     </div>
//   );
// };

// export default Calender;




import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useTable } from "react-table";
import { v4 as uuid } from "uuid";
import "./style.css"
const AppointmentForm = ({ onSubmit }) => {
  const [doctorName, setDoctorName] = useState("");
  const [doctorId, setDoctorId] = useState("");
  const [doctorEmail, setDoctorEmail] = useState("");
  const [doctorMobile, setDoctorMobile] = useState("");

  const [patientName, setPatientName] = useState("");
  const [patientId, setPatientId] = useState("");
  const [patientEmail, setPatientEmail] = useState("");
  const [patientMobile, setPatientMobile] = useState("");

  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedDate || !selectedTime) {
      alert("Please select both date and time.");
      return;
    }

    const appointmentDetails = {
      doctor: {
        name: doctorName,
        id: doctorId,
        email: doctorEmail,
        mobile: doctorMobile,
      },
      patient: {
        name: patientName,
        id: patientId,
        email: patientEmail,
        mobile: patientMobile,
      },
      id: uuid(),
      start: new Date(`${selectedDate}T${selectedTime}`),
    };

    onSubmit(appointmentDetails);

    setDoctorName("");
    setDoctorId("");
    setDoctorEmail("");
    setDoctorMobile("");
    setPatientName("");
    setPatientId("");
    setPatientEmail("");
    setPatientMobile("");
    setSelectedDate("");
    setSelectedTime("");
  };

  return (
    <form className="appointment-form" onSubmit={handleSubmit}>
      <div className="form-section">
        <h2>Doctor Details</h2>
        <label>
          Name:
          <input type="text" value={doctorName} onChange={(e) => setDoctorName(e.target.value)} />
        </label> 
        <label>
          ID:
          <input type="text" value={doctorId} onChange={(e) => setDoctorId(e.target.value)} />
        </label>
        <label>
          Email:
          <input type="email" value={doctorEmail} onChange={(e) => setDoctorEmail(e.target.value)} />
        </label>
        <label>
          Mobile:
          <input type="tel" value={doctorMobile} onChange={(e) => setDoctorMobile(e.target.value)} />
        </label>
      </div>

      <div className="form-section">
        <h2>Patient Details</h2>
        <label>
          Name:
          <input type="text" value={patientName} onChange={(e) => setPatientName(e.target.value)} />
        </label>
        <label>
          ID:
          <input type="text" value={patientId} onChange={(e) => setPatientId(e.target.value)} />
        </label>
        <label>
          Email:
          <input type="email" value={patientEmail} onChange={(e) => setPatientEmail(e.target.value)} />
        </label>
        <label>
          Mobile:
          <input type="tel" value={patientMobile} onChange={(e) => setPatientMobile(e.target.value)} />
        </label>
      </div>

      <div className="form-section">
        <h2>Appointment Details</h2>
        <label>
          Date:
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </label>
        <label>
          Time:
          <input
            type="time"
            value={selectedTime}
            onChange={(e) => setSelectedTime(e.target.value)}
          />
        </label>
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

const DataTable = ({ data }) => {
  const columns = React.useMemo(
    () => [
      {
        Header: "Doctor Name",
        accessor: "doctorName",
      },
      {
        Header: "Patient Name",
        accessor: "patientName",
      },
      {
        Header: "Date",
        accessor: "date",
      },
      {
        Header: "Time",
        accessor: "time",
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
  });

  return (
    <table {...getTableProps()} className="data-table">
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>{column.render("Header")}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => (
                <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

const Calender = () => {
  const [appointments, setAppointments] = useState([]);
  const [tableData, setTableData] = useState([]);

  const handleFormSubmit = (appointmentDetails) => {
    setAppointments([...appointments, appointmentDetails]);

    const newTableData = [
      ...tableData,
      {
        doctorName: appointmentDetails.doctor.name,
        patientName: appointmentDetails.patient.name,
        date: appointmentDetails.start.toLocaleDateString(),
        time: appointmentDetails.start.toLocaleTimeString(),
      },
    ];

    setTableData(newTableData);
  };

  return (
    <div className="calendar-container">
      <AppointmentForm onSubmit={handleFormSubmit} />

      {tableData.length > 0 && <DataTable data={tableData} />}

      <FullCalendar
        editable
        selectable
        events={appointments.map((appointment) => ({
          start: appointment.start,
          title: `${appointment.doctor.name} - ${appointment.patient.name}`,
          id: appointment.id,
        }))}
        headerToolbar={{
          start: "today prev next",
          end: "dayGridMonth dayGridWeek dayGridDay",
        }}
        plugins={[dayGridPlugin, interactionPlugin]}
        views={["dayGridMonth", "dayGridWeek", "dayGridDay"]}
      />
    </div>
  );
};

export default Calender;