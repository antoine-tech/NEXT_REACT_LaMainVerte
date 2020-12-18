import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getGarden } from "../requests/gardens";
import GardenCalendar from "../components/GardenCalendar";
import Error404 from "../components/Error404";

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

  if (gardenData && !gardenData.hasOwnProperty('status')) {
    return (
      <GardenCalendar
        garden_owner={gardenData?.user}
        events={gardenData?.events}
        setEvents={(value) => handleNewEvent(value)}
      />
    );
  } else {
    return <Error404 />;
  }
};

export default GardenHistory;
