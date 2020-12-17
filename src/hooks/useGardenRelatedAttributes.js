import { useState, useEffect } from "react";
import { getLocations } from "../requests/locations";
import { getClimates } from "../requests/climates";
import { getTags } from "../requests/tags";
import { getGardenTypes } from "../requests/gardens";

const useGardenRelatedAttributes = () => {
  const [tags, setTags] = useState([]);
  const [climates, setClimates] = useState([]);
  const [gardenTypes, setGardenTypes] = useState([]);
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        return await getTags();
      } catch (error) {
        console.error(error);
      }
    };
    const fetchClimates = async () => {
      try {
        return await getClimates();
      } catch (error) {
        console.error(error);
      }
    };

    const fetchGardenTypes = async () => {
      try {
        return await getGardenTypes();
      } catch (error) {
        console.error(error);
      }
    };

    const fetchLocations = async () => {
      try {
        return await getLocations();
      } catch (error) {
        console.error(error);
      }
    };

    const fetchGardenRelatedAttributes = async () => {
      let fetchedTags = await fetchTags();

      fetchedTags = fetchedTags.map((tag) => {
        return {
          id: tag.id,
          text: tag.name,
        };
      });
      setTags(fetchedTags);

      let fetchedClimates = await fetchClimates();

      fetchedClimates = fetchedClimates.map((climate) => {
        return {
          id: climate.id,
          text: climate.name,
        };
      });
      setClimates(fetchedClimates);

      let fetchedGardenTypes = await fetchGardenTypes();

      fetchedGardenTypes = fetchedGardenTypes.map((gardenType) => {
        return {
          id: gardenType.id,
          text: gardenType.name,
        };
      });

      setGardenTypes(fetchedGardenTypes);
      let fetchedLocations = await fetchLocations();

      fetchedLocations = fetchedLocations.map((location) => {
        return {
          id: location.id,
          text: location.name,
        };
      });
      setLocations(fetchedLocations);
    };

    fetchGardenRelatedAttributes();
  }, []);

  return {
    tags: tags,
    climates: climates,
    gardenTypes: gardenTypes,
    locations: locations,
  };
};

export default useGardenRelatedAttributes;
