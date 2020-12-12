import Cookies from "js-cookie";

const useJwtToken = () => {
  return {
    getJwtToken: Cookies.get("jwt_token"),
    setJwtToken: (value) => Cookies.set("jwt_token", value),
    unSetJwtToken: () => Cookies.remove("jwt_token"),
  };
};

export default useJwtToken;
