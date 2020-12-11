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

const getGarden = async (garden_id) => {
  const response = await API.find("/gardens/" + garden_id)
    .then((res) => res.json())
    .catch((error) => error);
  return response;
};

const getGardens = async () => {
  const response = await API.find("/gardens")
    .then((res) => res.json())
    .catch((error) => error);
  return response;
};

const getFollowedGardenAndRelatedData = async (gardens) => {
  // fetching each of the gardens available data to gather all related data to a garden at once
  let gardensDataPromises = await gardens.map((garden) => getGarden(garden.id));

  // solving Pomises and getting out the data as object
  let gardensDatas = await Promise.all(gardensDataPromises).then(
    (gardenData) => gardenData
  );

  // reformating object
  const followedGardens = gardensDatas.map((gardenData) => {
    let {
      garden: { id, name, updated_at, created_at },
      climate,
      location,
      type,
      user,
    } = gardenData;
    return {
      id,
      name,
      updated_at,
      created_at,
      climate,
      location,
      garden_type:type,
      user,
    };
  });

  return followedGardens;
};


const getGardenSelection = async () => {

  // fetching all gardens 
  let gardens = await getGardens();

  // fetching each of the gardens available data to gather all related data to a garden at once
  let gardenDataPromises = await gardens.map((userGardenSelection) =>
    getGarden(userGardenSelection.id)
  );
  // solving promises
  let gardensData = await Promise.all(gardenDataPromises).then(
    (gardenData) => gardenData
  );

  // reformating object
  const selectedGardens = gardensData.map((gardenData) => {
    let {
      garden: { id, name, updated_at, created_at },
      climate,
      location,
      type,
      user,
    } = gardenData;
    return {
      id,
      name,
      updated_at,
      created_at,
      climate,
      location,
      garden_type:type,
      user,
    };
  });

  return selectedGardens;
};

export {
  getClimate,
  getLocation,
  getGardenType,
  getGarden,
  getGardens,
  getFollowedGardenAndRelatedData,
  getGardenSelection
};
