import React, { useState } from "react";
import moment from "moment";
import { Calendar, momentLocalizer } from "react-big-calendar";
import useCurrentUser from "../../hooks/useCurrentUser";
import EventCreationForm from "../Forms/EventCreationForm/index";
import EventDisplay from "../EventDisplay";
import Modal from "../base_components/Modal/index";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./index.scss";

const localizer = momentLocalizer(moment);

const GardenCalendar = ({ events, setEvents, removeEvent, garden_owner }) => {
  const { current_user } = useCurrentUser();
  const [isModalOpen, setModalOpen] = useState(false);
  const [newEvent, setNewEvent] = useState(null);
  const [isEventDisplayed, setEventDisplayed] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);

  const handleSelectEvent = (obj, event) => {
    setCurrentEvent(obj);
    setEventDisplayed(true);
    setModalOpen(true);
  };

  const handleSelectDates = (event) => {
    if (current_user?.id === garden_owner.id) {
      setNewEvent({ start: event.start.toString(), end: event.end.toString() });
      setModalOpen(true);
    }
  };

  const handleRemoveEvent = (eventId) => {
    removeEvent(eventId);
  };

  return (
    <div
      className="w-full grid grid-cols-12 relative"
      style={{ backgroundColor: "#f8f8f8" }}
      id="calendar-container"
    >
      {events && (
        <Calendar
          localizer={localizer}
          events={events?.map((event) => {
            return {
              title: event.name,
              start: event.start_date,
              end: event.end_date,
              allDay: true,
              ressource: { event },
            };
          })}
          startAccessor="start"
          endAccessor="end"
          style={{ height: "85vh" }}
          onSelectEvent={(obj, event) => {
            handleSelectEvent(obj, event);
          }}
          onSelectSlot={(event) => handleSelectDates(event, current_user)}
          selectable
          className="col-span-8 col-start-3 bg-white m-8"
        />
      )}

      {isModalOpen &&
        (!isEventDisplayed ? (
          <Modal
            id="modal"
            parentNodeId="calendar-container"
            component={EventCreationForm}
            setModalOpen={setModalOpen}
            data={newEvent}
            events={events}
            setEvents={(value) => setEvents(value)}
          />
        ) : (
          <Modal
            id="modal"
            parentNodeId="calendar-container"
            component={EventDisplay}
            setModalOpen={setModalOpen}
            data={currentEvent}
            setEventDisplayed={setEventDisplayed}
            removeEvent={(value) => handleRemoveEvent(value)}
          />
        ))}
    </div>
  );
};

export default GardenCalendar;
