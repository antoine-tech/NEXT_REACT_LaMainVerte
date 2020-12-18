import { find } from "../sevices/Api";
const getClimates = async () => await find("/climates", false).then((res) => res.json());

export { getClimates };
