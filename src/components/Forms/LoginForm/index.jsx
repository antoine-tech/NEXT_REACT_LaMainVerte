import React, { useState } from "react";
import ReactDOM from "react-dom";
import FormGroup from "../../FormGroup/index";
import useFormAnalysis from "../../../hooks/useFormAnalysis";
import LetsGoButton from "../../buttons/LetsGoButton/index";
import RegistrationLinks from "../../RegistrationLinks";
import useJwtToken from "../../../hooks/useJwtToken";
import { signUserIn } from "../../../requests/user";
import useCurrentUser from "../../../hooks/useCurrentUser";
import Alert from "../../Alert";
import { useHistory } from "react-router-dom";

const LoginForm = ({ setAlertMessage, setIsAlertDisplayed, setAlertType }) => {
  // formAnalysis custom hook allowing to get intels on inputs validations
  const { userDatas, alerts, handleInput, handleBlur } = useFormAnalysis();

  // current user custom hook to get and set currentUser in relation with redux global state
  const { setCurrentUser, currentUser } = useCurrentUser();

  // jwt token custom hook to get and set Cookies containing jwt token if available
  const { getJwtToken, setJwtToken } = useJwtToken();

  const history = useHistory();

  // event handler for the submit action of the form allowing to perform login action
  const handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password } = userDatas;
    if (email !== "" && password !== "") {
      const response = await signUserIn(email, password).then((res) => {
        if (res.headers.get("Authorization")) {
          setJwtToken(res.headers.get("Authorization"));
          history.push("/");
        }
        return res.json();
      });

      if (response.hasOwnProperty("data")) {
        setCurrentUser(response.data);
      } else {
        setAlertMessage("Les informations fournies ne sont pas correctes");
        setAlertType("danger");
        setIsAlertDisplayed(true);
        // display alert on page
        console.error(response);
      }
    }
  };

  return (
    <>
      <h1 className="col-span-2 my-2">De retour parmi nous ?</h1>
      <form
        action=""
        className="grid grid-cols-2 gap-4 my-2"
        onSubmit={handleSubmit}
      >
        <FormGroup
          colSpan="2"
          onInput={(value) => handleInput(value)}
          onBlur={(value) => handleBlur(value)}
          value={userDatas.email}
          name="email"
          id="email"
          type="text"
          labelText="Adresse email :"
          alertMessage={alerts.email}
        />
        <FormGroup
          colSpan="2"
          onInput={(value) => handleInput(value)}
          onBlur={(value) => handleBlur(value)}
          value={userDatas.password}
          name="password"
          id="password"
          type="password"
          labelText="Mot de passe :"
          alertMessage={alerts.password}
        />

        <LetsGoButton backgroundColor="bg-green" text="C'EST PARTI" />

        <RegistrationLinks />
      </form>
    </>
  );
};

export default LoginForm;
