// import React, { useRef, useEffect } from 'react';
// import FullCalendar from '@fullcalendar/react';
// import dayGridPlugin from '@fullcalendar/daygrid';
// import timeGridPlugin from '@fullcalendar/timegrid';
// import resourceTimeGridPlugin from '@fullcalendar/resource-timegrid';

// const Fullcalender = ({events,addEvent, addEvent22}) => {
//   const resources = [
//     {
//       id: 'a',
//       title: 'Doctor',
//     },
//     {
//       id: 'b',
//       title: 'Patient',
//     },  
//   ];

   
 

//   const calendarRef = useRef(null);

//   useEffect(() => {
//     if (calendarRef.current) {
//       calendarRef.current.getApi().addResource(resources);
//       calendarRef.current.getApi().removeAllEvents(); 
//       calendarRef.current.getApi().addEventSource(events);
//     }
//   }, [resources, events]);


//   const changeView = (view) => {
//     if (calendarRef.current) {
//       calendarRef.current.getApi().changeView(view);
//     }
//   };


//   const eventContent = (info) => {
//     const { event } = info;
//     return (
//       <>
//         <strong>{event.title}</strong>
//         <p>{event.start.toLocaleString()} to {event.end.toLocaleString()}</p>
//         <p>{event.description}</p>
//       </>
//     );
//   };

  


//   return (
//     <div>
//       <FullCalendar
//         ref={calendarRef}
//         plugins={[dayGridPlugin, timeGridPlugin, resourceTimeGridPlugin]}
//         initialView="resourceTimeGridDay"
//         allDaySlot={false}
//         editable={true}
//         eventOverlap={true}
//         eventBackgroundColor="grey"
//         eventTextColor="white"
//         eventBorderColor="black"
//         events={events}
//         eventContent={eventContent} 
//       />
//     </div>
//   );

//   };

    
// //   return (
// //     <div>
// //       <div>
// //         <FullCalendar
// //           ref={calendarRef}
// //           plugins={[dayGridPlugin, timeGridPlugin, resourceTimeGridPlugin]}
// //           initialView="resourceTimeGridDay"
// //           allDaySlot={false}
// //           editable={true}
// //           eventOverlap={true}
// //           eventBackgroundColor="grey"
// //           eventTextColor="white"
// //           eventBorderColor="black"
// //           events={events} // Pass events directly to FullCalendar
// //         />
// //       </div>
// //       <div>
// //         <h2>Event Details</h2>
// //         <ul>
// //           {events.map((event, index) => (
// //             <li key={index}>
// //               {event.title} - {event.start.toLocaleString()} to {event.end.toLocaleString()}
// //             </li>
// //           ))}
// //         </ul>
// //       </div>
// //     </div>
// //   );
// // };
// export default Fullcalender;  





// Fullcalender.jsx
import React, { useRef, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import resourceTimeGridPlugin from '@fullcalendar/resource-timegrid';
import { createPortal } from 'react-dom';

const Fullcalender = ({ events }) => {
  const resources = [
    {
      id: 'a',
      title: 'Doctor',
    },
    {
      id: 'b',
      title: 'Patient',
    },
  ];

  const calendarRef = useRef(null);

  useEffect(() => {
    if (calendarRef.current) {
      calendarRef.current.getApi().addResource(resources);
      calendarRef.current.getApi().removeAllEvents();
      calendarRef.current.getApi().addEventSource(events);
    }
  }, [resources, events]);

  const changeView = (view) => {
    if (calendarRef.current) {
      calendarRef.current.getApi().changeView(view);
    }
  };

  const eventDidMount = (info) => {
    const tooltipContainer = document.createElement('div');
    tooltipContainer.className = 'custom-tooltip';
    document.body.appendChild(tooltipContainer);

    const Tooltip = () => {
      return (
        <div>
          <strong>{info.event.title}</strong>
          <p>{info.event.start.toLocaleString()} to {info.event.end.toLocaleString()}</p>
          <p>{info.event.description}</p>
        </div>
      );
    };

    createPortal(<Tooltip />, tooltipContainer);

    return () => {
      document.body.removeChild(tooltipContainer);
    };
  };

  return (
    <div>
      <style>{`
        .custom-tooltip {
          position: absolute;
          z-index: 9999;
          background-color: white;
          border: 1px solid #ccc;
          padding: 10px;
        }
      `}</style>
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, timeGridPlugin, resourceTimeGridPlugin]}
        initialView="resourceTimeGridDay"
        allDaySlot={false}
        editable={true}
        eventOverlap={true}
        eventBackgroundColor="grey"
        eventTextColor="white"
        eventBorderColor="black"
        events={events}
        eventDidMount={eventDidMount}
      />
    </div>
  );
};

export default Fullcalender;
