import { find, create, deletion, update } from "../services/Api";

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
      garden: {
        id,
        name,
        picture_url,
        picture_opacity,
        updated_at,
        created_at,
      },
      climate,
      location,
      type,
      user,
    } = gardenData;
    return {
      id,
      name,
      picture_url,
      picture_opacity,
      updated_at,
      created_at,
      climate,
      location,
      garden_type: type,
      user,
    };
  });

  return followedGardens;
};

const getClimate = async (garden_climate_id) =>
  find("/climates/" + garden_climate_id)
    .then((res) => res.json())
    .catch((error) => error);

const getLocation = async (garden_location_id) =>
  find("/locations/" + garden_location_id)
    .then((res) => res.json())
    .catch((error) => error);

const getGardenTypes = async () =>
  find("/garden_types/")
    .then((res) => res.json())
    .catch((error) => error);

const getGardenType = async (garden_type_id) =>
  find("/garden_types/" + garden_type_id)
    .then((res) => res.json())
    .catch((error) => error);

const createGarden = async (gardenData, userToken) => {
  const response = await create(gardenData, "/gardens", true, userToken)
    .then((res) => res.json())
    .catch((error) => error);
  return response;
};

const updateGarden = async (garden_id, gardenData, userToken) => {
  const response = await update(
    gardenData,
    `/gardens/${garden_id}`,
    true,
    userToken
  )
    .then((res) => res.json())
    .catch((error) => error);
  return response;
};

const getGarden = async (garden_id) =>
  find("/gardens/" + garden_id)
    .then((res) => res.json())
    .catch((error) => error);

const getGardens = async () =>
  find("/gardens")
    .then((res) => res.json())
    .catch((error) => error);

const follow = async (garden_id, jwt_token) => {
  const data = {
    follow: {
      garden_id,
    },
  };
  return await create(data, "/follows", true, jwt_token).then((res) =>
    res.json()
  );
};

const unfollow = async (follow_id, jwt_token) => {
  return await deletion("/follows/" + follow_id, true, jwt_token).then((res) =>
    res.text()
  );
};

const likeGarden = async (idGarden, jwt_token) => {
  const data = {
    garden_like: { garden_id: idGarden },
  };
  return await create(data, "/garden_likes", true, jwt_token)
    .then((res) => res.json())
    .catch((error) => error);
};

const unlikeGarden = async (gardenLikeId, jwt_token) =>
  await deletion("/garden_likes/" + gardenLikeId, true, jwt_token)
    .then((res) => res.text())
    .catch((error) => error);

const getEvents = async (garden_id) => {
  const { events } = await find(`/gardens/${garden_id}/`).then((res) =>
    res.json()
  );
  return events;
};

const deleteGarden = async (gardenId, jwt_token) =>
  await deletion("/gardens/" + gardenId, true, jwt_token)
    .then((res) => res.text())
    .catch((error) => error);


const search = async (ressource, params) => {
  const searchResults = await find(`/${ressource}?${params}`).then((res) =>
    res.json()
  );

  const gardenPromises = await searchResults?.map((searchResult) =>
    getGarden(searchResult.id)
  );

  const gardens = await Promise.all(gardenPromises);

  const selectedGardens = gardens.map((gardenData) => {
    let {
      garden: {
        id,
        name,
        picture_url,
        picture_opacity,
        updated_at,
        created_at,
      },
      climate,
      location,
      type,
      user,
    } = gardenData;
    return {
      id,
      name,
      picture_url,
      picture_opacity,
      updated_at,
      created_at,
      climate,
      location,
      garden_type: type,
      user,
    };
  });

  return selectedGardens;
};

export {
  getClimate,
  getLocation,
  getGardenType,
  getGardenTypes,
  getGarden,
  getGardens,
  getEvents,
  follow,
  unfollow,
  likeGarden,
  unlikeGarden,
  createGarden,
  search,
  updateGarden,
  getFollowedGardenAndRelatedData,
  deleteGarden
};
