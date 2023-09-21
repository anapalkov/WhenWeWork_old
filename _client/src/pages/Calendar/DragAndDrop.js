import { useState, useCallback } from "react";
import { EVENTS } from "./constants";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
// import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import { Calendar as BigCalendar, stringOrDate } from "react-big-calendar";
import { Box, Flex } from "@chakra-ui/react";
import AppointmentEvent from "./AppointmentEvent";
import OutsideEvent from "./OutsideEvent";
// import props from "./props"

import { momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";

const localizer = momentLocalizer(moment);
// const components = {
//   event: ({ event }) => {
//     const data = event?.data;


//     if (data?.appointment) {
//       return <AppointmentEvent appointment={data?.appointment} />;
//     }
//     return null;
//   },
// };



// {
//   start: moment("2023-09-07T09:00:00").toDate(),
//   end: moment("2023-09-07T10:00:00").toDate(),
//   data: {
//     appointment: {
//       id: 1,
//       status: "P",
//       location: "New York",
//       resource: "Dr Michelle",
//       address: "Building 5\nStreet 44\nNear Express Highway\nNew York",
//     },
//   },
//   isDraggable: true,
//   resourceId: 1,
// }




const DnDCalendar = withDragAndDrop(BigCalendar);

function DragAndDrop({ user, setUser, myCompany, setMyCompany }) {

  const components = {
    event: ({ event }) => {
      const shift = event;
      if (shift) {
        // Find the user to whom the shift belongs
        const user = myCompany.users.find((user) => user.id === shift.user_id);

        if (user) {
          return (
            <div>
              <strong>User:</strong> {user.fname} {user.lname}
              <br />
              <strong>Title:</strong> {shift.title}
              <br />
              <strong>Location:</strong> {shift.location}
              <br />

            </div>
          );
        }
      }

      return null;
    },
  };

  const currentDate = new Date();
  const currentDateString = currentDate.toISOString().slice(0, 10);

  const props = {
    components,
    localizer,
    defaultDate: currentDateString,
    defaultView: Views.MONTH,
    max: moment("2022-10-10T16:00:00").toDate(),
    min: moment("2022-10-10T08:00:00").toDate(),
  };





  const [events, setEvents] = useState(myCompany.shifts);

  const onChangeEventTime = useCallback(
    ({
      event,
      start,
      end,
      resourceId,
    }) => {
      setEvents((prevEvents) =>
        prevEvents.map((prevEvent) =>
          // prevEvent?.data?.appointment?.id === event?.data?.appointment?.id
          prevEvent?.id === event.id
            ? { ...event, start, end, resourceId }
            : prevEvent
        )
      );
    },
    []
  );

  const [draggedEvent, setDraggedEvent] = useState();

  // const onDroppedFromOutside = useCallback(
  //   ({
  //     start,
  //     end,
  //     resource,
  //   }) => {
  //     if (draggedEvent === "undroppable") return;
  //     setEvents((prevEvents) => [
  //       ...prevEvents,
  //       {
  //         start,
  //         end,
  //         resourceId: resource,
  //         data: { appointment: draggedEvent },
  //         isDraggable: true,
  //         isResizable: true,
  //       },
  //     ]);
  //   },
  //   [draggedEvent]
  // );



  // const dummyAppointment = {
  //   id: 3,
  //   status: "CI",
  //   location: "Connecticut",
  //   resource: "Alex Hales",
  //   address: "1241 E Main St\n Stamford\n CT 06902\n United States",
  // };



  // const resources = [
  //   { id: 1, title: "Dr Graff" },
  //   { id: 2, title: "Dr Alex" },
  //   { id: 3, title: "Dr Michelle" },
  // ];

  return (
    <Flex p={2} gap={4} height="100%" width="100%" direction={"column"}>
      {/* <Box>
        <Flex gap={4}>
          <Box
            width={200}
            cursor="pointer"
            onDragStart={() => setDraggedEvent(dummyAppointment)}
            draggable
          >
            <AppointmentEvent appointment={dummyAppointment} />
          </Box>
          <OutsideEvent
            onDragStart={() => setDraggedEvent("undroppable")}
            draggable
          >
            Draggable but not for calendar.
          </OutsideEvent>
        </Flex>
      </Box> */}

      <Box flex="1" overflow="auto" width="100%" mt={100}>
        <DnDCalendar

          {...props}
          events={events}
          // resources={resources}
          // draggableAccessor={(event) => !!event.isDraggable}
          draggableAccessor={(event) => true}
          resizableAccessor={"isResizable"}
          onEventDrop={onChangeEventTime}
          onEventResize={onChangeEventTime}
        // onDropFromOutside={onDroppedFromOutside}
        />
      </Box>
    </Flex>
  );
}


export default DragAndDrop;