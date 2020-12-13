import { find, create, deletion } from "../sevices/Api";

const getClimate = async (garden_climate_id) =>
  find("/climates/" + garden_climate_id)
    .then((res) => res.json())
    .catch((error) => error);

const getLocation = async (garden_location_id) =>
  find("/locations/" + garden_location_id)
    .then((res) => res.json())
    .catch((error) => error);

const getGardenType = async (garden_type_id) =>
  find("/garden_types/" + garden_type_id)
    .then((res) => res.json())
    .catch((error) => error);

const getGarden = async (garden_id) =>
  find("/gardens/" + garden_id)
    .then((res) => res.json())
    .catch((error) => error);

const getGardens = async () =>
  find("/gardens")
    .then((res) => res.json())
    .catch((error) => error);

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
      garden_type: type,
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
      garden_type: type,
      user,
    };
  });

  return selectedGardens;
};

const follow = async (garden_id, jwt_token) => {
  const data = {
    follow: {
      garden_id,
    },
  };
  return await create(data, "/follows", true, jwt_token).then((res) =>
    res.text()
  );
};

const unfollow = async (follow_id, jwt_token) => {
  return await deletion("/follows/" + follow_id, true, jwt_token).then((res) =>
    res.json()
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

export {
  getClimate,
  getLocation,
  getGardenType,
  getGarden,
  getGardens,
  getFollowedGardenAndRelatedData,
  getGardenSelection,
  follow,
  unfollow,
  likeGarden,
  unlikeGarden,
};
