import { find } from "../sevices/Api";

const getLocations = async () => await find("/locations", false).then((res) => res.json());

export {getLocations}