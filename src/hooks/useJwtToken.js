import React from "react";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";

// custom hook to get and set Cookies containing jwt_token informations
const useJwtToken = () => {
  // returning function as setter and  value as getter
  return {
    getJwtToken: Cookies.get("jwt_token"),
    setJwtToken: (value) => Cookies.set("jwt_token", value),
  };
};

export default useJwtToken;
