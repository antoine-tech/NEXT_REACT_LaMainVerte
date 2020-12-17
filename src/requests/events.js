import { create } from "../sevices/Api";

const createEvent = async (garden_id, data, jwt_token) => {
  return await create(data, `/gardens/${garden_id}/events`, true, jwt_token).then((res) =>
    res.json()
  );
};


export { createEvent};
