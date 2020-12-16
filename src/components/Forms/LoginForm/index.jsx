import React from "react";
import FormGroup from "../../FormGroup/index";
import useFormAnalysis from "../../../hooks/useFormAnalysis";
import LetsGoButton from "../../buttons/LetsGoButton/index";
import RegistrationLinks from "../../RegistrationLinks";
import { signUserIn } from "../../../requests/user";
import useCurrentUser from "../../../hooks/useCurrentUser";
import { useHistory } from "react-router-dom";

const LoginForm = ({ setAlertMessage, setIsAlertDisplayed, setAlertType }) => {
  const { datas, alerts, handleInput, handleBlur } = useFormAnalysis(
    {
      email: "",
      password: "",
    },
    {
      isEmpty: "Ce champ est obligatoire",
    }
  );
  const { setCurrentUser } = useCurrentUser();
  const history = useHistory();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password } = datas;
    if (email !== "" && password !== "") {
      const response = await signUserIn(email, password);

      if (response) {
        setCurrentUser(response);
        history.push("/");
      } else {
        setAlertMessage("Les informations fournies ne sont pas correctes");
        setAlertType("danger");
        setIsAlertDisplayed(true);
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
          value={datas.email}
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
          value={datas.password}
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
