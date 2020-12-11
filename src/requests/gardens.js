import API from "../sevices/index";

const getClimate = async (garden_climate_id) => {
  const response = await API.find("/climates/" + garden_climate_id)
    .then((res) => res.json())
    .catch((error) => error);
  return response;
};

const getLocation = async (garden_location_id) => {
  const response = await API.find("/locations/" + garden_location_id)
    .then((res) => res.json())
    .catch((error) => error);
  return response;
};

const getGardenType = async (garden_type_id) => {
  const response = await API.find("/garden_types/" + garden_type_id)
    .then((res) => res.json())
    .catch((error) => error);
  return response;
};

const createGarden = async (gardenData, userToken) => {
  console.log(userToken);
  const response = await API.create(gardenData, "/gardens", true, userToken)
    .then((res) => res.json())
    .catch((error) => error);
  return response;
}

export { getClimate, getLocation, getGardenType, createGarden };
