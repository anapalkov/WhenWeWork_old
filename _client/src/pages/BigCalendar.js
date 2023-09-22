// import format from "date-fns/format";
// import getDay from "date-fns/getDay";
// import parse from "date-fns/parse";
// import startOfWeek from "date-fns/startOfWeek";
// import { Calendar, dateFnsLocalizer } from "react-big-calendar";
// import "react-big-calendar/lib/css/react-big-calendar.css";
// import "react-datepicker/dist/react-datepicker.css";
// import "./App.css";
// import { useEffect, useRef, useCallback, buildMessage, useState } from "react";
// import styled from "styled-components";

// const locales = {
//     "en-US": require("date-fns/locale/en-US"),
// };
// const localizer = dateFnsLocalizer({
//     format,
//     parse,
//     startOfWeek,
//     getDay,
//     locales,
// });

// // const events = [
// //     {
// //         title: "Big Meeting",
// //         allDay: true,
// //         start: new Date(2023, 8, 25),
// //         end: new Date(2023, 8, 25),
// //     }
// // ];


// function OnSelectallShift() {
//     const clickRef = useRef(null)

//     useEffect(() => {
//         /**
//          * What Is This?
//          * This is to prevent a memory leak, in the off chance that you
//          * teardown your interface prior to the timed method being called.
//          */
//         return () => {
//             window.clearTimeout(clickRef?.current)
//         }
//     }, [])

//     const onSelectallShift = useCallback((calEvent) => {
//         /**
//          * Here we are waiting 250 milliseconds (use what you want) prior to firing
//          * our method. Why? Because both 'click' and 'doubleClick'
//          * would fire, in the event of a 'doubleClick'. By doing
//          * this, the 'click' handler is overridden by the 'doubleClick'
//          * action.
//          */
//         window.clearTimeout(clickRef?.current)
//         clickRef.current = window.setTimeout(() => {
//             window.alert(buildMessage(calEvent, 'onSelectEvent'))
//         }, 250)
//     }, [])

//     const onDoubleClickEvent = useCallback((calEvent) => {
//         /**
//          * Notice our use of the same ref as above.
//          */
//         window.clearTimeout(clickRef?.current)
//         clickRef.current = window.setTimeout(() => {
//             window.alert(buildMessage(calEvent, 'onDoubleClickEvent'))
//         }, 250)
//     }, [])
// }

// function BigCalendar({ user, myCompany, setMyCompany }) {

//     const [allShifts, setAllShifts] = useState([...myCompany.users.reduce((acc, user) => acc.concat(user.shifts), [])]);
//     console.log("ALL Shifts")
//     console.log(allShifts)

//     const eventStyleGetter = (event, start, end, isSelected) => {
//         const style = {
//             backgroundColor: event.user_id === user.id ? 'green' : 'gray', // Set different colors based on user_id
//         };
//         return { style };
//     };


//     // function handleAddEvent() {
//     //     for (let i = 0; i < allEvents.length; i++) {

//     //         const d1 = new Date(allEvents[i].start);
//     //         const d2 = new Date(newEvent.start);
//     //         const d3 = new Date(allEvents[i].end);
//     //         const d4 = new Date(newEvent.end);

//     //         if (
//     //             ((d1 <= d2) && (d2 <= d3)) || ((d1 <= d4) &&
//     //                 (d4 <= d3))
//     //         ) {
//     //             alert("CLASH");
//     //             break;
//     //         }
//     //     }
//     //     setAllEvents([...allEvents, newEvent]);
//     // }


//     return (
//         <BigCalendarWrapper className="Calendar">
//             {/* <h1>Calendar</h1>
//             <h2>Add New Event</h2>
//             <div>
//                 <input type="text" placeholder="Add Title" style={{ width: "20%", marginRight: "10px" }} value={newEvent.title} onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} />
//                 <DatePicker placeholderText="Start Date" style={{ marginRight: "10px" }} selected={newEvent.start} onChange={(start) => setNewEvent({ ...newEvent, start })} />
//                 <DatePicker placeholderText="End Date" selected={newEvent.end} onChange={(end) => setNewEvent({ ...newEvent, end })} />
//                 <button stlye={{ marginTop: "10px" }} onClick={handleAddEvent}>
//                     Add Event
//                 </button>
//             </div> */}
//             <Calendar
//                 localizer={localizer}
//                 events={allShifts}
//                 startAccessor="start"
//                 endAccessor="end"
//                 style={{ height: 500, margin: "50px" }}
//                 // onSelectEvent={onSelectEvent}
//                 eventPropGetter={eventStyleGetter} // Apply custom event styles
//             />
//         </BigCalendarWrapper>
//     );
// }

// const BigCalendarWrapper = styled.div`
//   margin-top: 120px; /* Adjust the margin-top to create space below the NavBar */
//   ${'' /* display: flex;
//   flex-direction: column;
//   align-items: center; */}
// `;


// export default BigCalendar;

