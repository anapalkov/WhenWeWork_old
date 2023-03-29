import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import React, { useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./App.css";
import { useEffect, useRef, useCallback, buildMessage } from "react";

const locales = {
    "en-US": require("date-fns/locale/en-US"),
};
const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});

const events = [
    {
        title: "Big Meeting",
        allDay: true,
        start: new Date(2023, 3, 25),
        end: new Date(2023, 3, 25),
    },
    {
        title: "Vacation",
        start: new Date(2023, 3, 7),
        end: new Date(2023, 3, 10),
    },
    {
        title: "Conference",
        start: new Date(2023, 3, 20),
        end: new Date(2023, 3, 23),
    },
];

function OnSelectEvent() {
    const clickRef = useRef(null)

    useEffect(() => {
        /**
         * What Is This?
         * This is to prevent a memory leak, in the off chance that you
         * teardown your interface prior to the timed method being called.
         */
        return () => {
            window.clearTimeout(clickRef?.current)
        }
    }, [])

    const onSelectEvent = useCallback((calEvent) => {
        /**
         * Here we are waiting 250 milliseconds (use what you want) prior to firing
         * our method. Why? Because both 'click' and 'doubleClick'
         * would fire, in the event of a 'doubleClick'. By doing
         * this, the 'click' handler is overridden by the 'doubleClick'
         * action.
         */
        window.clearTimeout(clickRef?.current)
        clickRef.current = window.setTimeout(() => {
            window.alert(buildMessage(calEvent, 'onSelectEvent'))
        }, 250)
    }, [])

    const onDoubleClickEvent = useCallback((calEvent) => {
        /**
         * Notice our use of the same ref as above.
         */
        window.clearTimeout(clickRef?.current)
        clickRef.current = window.setTimeout(() => {
            window.alert(buildMessage(calEvent, 'onDoubleClickEvent'))
        }, 250)
    }, [])
}

function Test2({ user }) {

    const [allEvents, setAllEvents] = useState(events);
    const [allMyShifts, setAllMyShifts] = useState([]);
    useEffect(() => {
        fetch("/api/me")
            .then(r => r.json())
            .then(json => {
                setAllEvents(json.shifts.sort((a, b) => { return new Date(a.end) - new Date(b.end) }))
            }
            );
    }, []);


    // const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" });

    console.log(allMyShifts)

    // function handleAddEvent() {
    //     for (let i = 0; i < allEvents.length; i++) {

    //         const d1 = new Date(allEvents[i].start);
    //         const d2 = new Date(newEvent.start);
    //         const d3 = new Date(allEvents[i].end);
    //         const d4 = new Date(newEvent.end);

    //         if (
    //             ((d1 <= d2) && (d2 <= d3)) || ((d1 <= d4) &&
    //                 (d4 <= d3))
    //         ) {
    //             alert("CLASH");
    //             break;
    //         }
    //     }
    //     setAllEvents([...allEvents, newEvent]);
    // }






    return (
        <div className="Calendar">
            {/* <h1>Calendar</h1>
            <h2>Add New Event</h2>
            <div>
                <input type="text" placeholder="Add Title" style={{ width: "20%", marginRight: "10px" }} value={newEvent.title} onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} />
                <DatePicker placeholderText="Start Date" style={{ marginRight: "10px" }} selected={newEvent.start} onChange={(start) => setNewEvent({ ...newEvent, start })} />
                <DatePicker placeholderText="End Date" selected={newEvent.end} onChange={(end) => setNewEvent({ ...newEvent, end })} />
                <button stlye={{ marginTop: "10px" }} onClick={handleAddEvent}>
                    Add Event
                </button>
            </div> */}
            <Calendar
                localizer={localizer}
                events={allEvents}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500, margin: "50px" }}
            // onSelectEvent={onSelectEvent}
            />
        </div>
    );
}

export default Test2;

