import { find } from "../services/Api";
const getClimates = async () => await find("/climates", false).then((res) => res.json());

export { getClimates };
