import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getEvents, getGarden } from "../requests/gardens";
import GardenCalendar from "../components/GardenCalendar";

const GardenHistory = () => {
  const [gardenData, setGardenData] = useState(null);
  const { garden_id } = useParams();

  const handleNewEvent = (value) => {
    const newEvents = [...gardenData.events, value];
    setGardenData({ ...gardenData, events: newEvents });
  };

  useEffect(() => {
    const fecthAndSetGardenData = async () => {
      const fetchedGarden = await getGarden(garden_id);
      setGardenData(fetchedGarden);
    };

    fecthAndSetGardenData();
  }, []);

  useEffect(() => {
    console.log(gardenData);
  }, [gardenData]);

  return (
    <GardenCalendar
      garden_owner={gardenData?.user}
      events={gardenData?.events}
      setEvents={(value) => handleNewEvent(value)}
    />
  );
};

export default GardenHistory;
