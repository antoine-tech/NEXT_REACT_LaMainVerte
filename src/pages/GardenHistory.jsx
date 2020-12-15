import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GardenCalendar from "../components/GardenCalendar";
import { getEvents } from "../requests/gardens";

const GardenHistory = () => {
  const [events, setEvents] = useState([]);

  const { garden_id } = useParams();

  useEffect(() => {
    const fecthEvents = async () => {
      const fetchedEvents = await getEvents(garden_id);
      setEvents(fetchedEvents);
    };

    fecthEvents();

  }, []);

  return (

  
    <GardenCalendar
      events={events}
      setEvents={(value) => setEvents([...events, value])}
    />

  );
};

export default GardenHistory;
