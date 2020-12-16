import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import Modal from "../Modal";
import EventCreationForm from "../Forms/EventCreationForm/index";
import useCurrentUser from "../../hooks/useCurrentUser";
import { useHistory } from "react-router-dom";

const localizer = momentLocalizer(moment);

const GardenCalendar = ({ events, setEvents }) => {
  const { current_user } = useCurrentUser();
  const history = useHistory();
  const [isModalOpen, setModalOpen] = useState(false);
  const [newEvent, setNewEvent] = useState(null);
  const handleSelectEvent = (event) => {
    //console.log(event);
  };

  const handleSelectDates = (event) => {
    if (current_user) {
      setNewEvent({ start: event.start.toString(), end: event.end.toString() });
      setModalOpen(true);
    } else {
      history.push("/login");
    }
  };

  return (
    <div
      className="w-full grid grid-cols-12 relative"
      style={{ backgroundColor: "#f8f8f8" }}
      id="calendar-container"
    >
      <Calendar
        localizer={localizer}
        events={events.map((event) => {
          return {
            title: event.name,
            start: event.start_date,
            end: event.end_date,
            allDay: true,
            ressource: event.description,
          };
        })}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "85vh" }}
        onSelectEvent={(event) => {
          handleSelectEvent(event);
        }}
        onSelectSlot={(event) => handleSelectDates(event, current_user)}
        selectable
        className="col-span-8 col-start-3 bg-white m-8"
      />

      {isModalOpen && (
        <Modal
          id="modal"
          parentNodeId="calendar-container"
          component={EventCreationForm}
          setModalOpen={setModalOpen}
          data={newEvent}
          events={events}
          setEvents={(value) => setEvents(value)}
        />
      )}
    </div>
  );
};

export default GardenCalendar;
