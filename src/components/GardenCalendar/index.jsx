import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";

const localizer = momentLocalizer(moment);

const GardenCalendar = ({ events }) => {
  const handleSelectEvent = () => {};
  return (
    <div className="w-full grid grid-cols-12" style={{backgroundColor:"#f8f8f8"}}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "85vh" }}
        onSelectEvent={(event) => {
          handleSelectEvent(event);
        }}
        className="col-span-8 col-start-3 bg-white m-8"
      />
    </div>
  );
};

export default GardenCalendar;
