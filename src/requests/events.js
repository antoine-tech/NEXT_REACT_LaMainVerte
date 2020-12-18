import { create, deletion } from "../sevices/Api";

const createEvent = async (garden_id, data, jwt_token) => {
  return await create(data, `/gardens/${garden_id}/events`, true, jwt_token).then((res) =>
    res.json()
  );
};


const deleteEvent = async (eventId, jwt_token) =>
  await deletion("/events/" + eventId, true, jwt_token)
    .then((res) => res.text())
    .catch((error) => error);



export { createEvent, deleteEvent};
