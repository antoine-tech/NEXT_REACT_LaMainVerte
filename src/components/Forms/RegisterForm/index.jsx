import React, { useEffect } from "react";
import FormGroup from "../../FormGroup/index";
import useFormAnalysis from "../../../hooks/useFormAnalysis";
import LetsGoButton from "../../buttons/LetsGoButton/index";
import RegistrationLinks from "../../RegistrationLinks";
import { signUserUp } from "../../../requests/user";
import { useHistory } from "react-router-dom";

const RegiterForm = ({
  setAlertMessage,
  setIsAlertDisplayed,
  setAlertType,
}) => {
  const { userDatas, alerts, handleInput, handleBlur } = useFormAnalysis();
  const history = useHistory();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const {
      email,
      password,
      password_confirmation,
      firstname,
      lastname,
      username,
    } = userDatas;

    if (
      password_confirmation === password &&
      firstname !== "" &&
      lastname !== "" &&
      password_confirmation !== "" &&
      username !== ""
    ) {
      const response = await signUserUp(
        firstname,
        lastname,
        username,
        email,
        password,
        password_confirmation
      ).then((res) => res.json());

      if (response.hasOwnProperty("data")) {
        setAlertMessage("Compte crée avec succès");
        setAlertType("success");
        setIsAlertDisplayed(true);
        history.push('/login');
      } else {
        setAlertMessage(
          "Une erreur est survenue veuillez contacter le support technique"
        );
        setAlertType("danger");
        setIsAlertDisplayed(true);
      }
    }
  };

  return (
    <>
      <h1 className="col-span-2 my-2">Bienvenue parmi nous !</h1>
      <form
        action=""
        className="grid grid-cols-2 gap-4 my-2"
        onSubmit={handleSubmit}
      >
        <FormGroup
          colSpan="2 md:col-span-1"
          onInput={(value) => handleInput(value)}
          onBlur={(value) => handleBlur(value)}
          value={userDatas.lastname}
          name="lastname"
          id="lastname"
          type="text"
          labelText="Nom :"
          alertMessage={alerts.lastname}
        />

        <FormGroup
          colSpan="2 md:col-span-1"
          onInput={(value) => handleInput(value)}
          onBlur={(value) => handleBlur(value)}
          value={userDatas.firstname}
          name="firstname"
          id="firstname"
          type="text"
          labelText="Prénom :"
          alertMessage={alerts.firstname}
        />

        <FormGroup
          colSpan="2"
          onInput={(value) => handleInput(value)}
          onBlur={(value) => handleBlur(value)}
          value={userDatas.username}
          name="username"
          id="username"
          type="text"
          labelText="Identifiant :"
          alertMessage={alerts.username}
        />

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
        <FormGroup
          colSpan="2"
          onInput={(value) => handleInput(value)}
          onBlur={(value) => handleBlur(value)}
          value={userDatas.password_confirmation}
          name="password_confirmation"
          id="password_confirmation"
          type="password"
          labelText="Confirmer le mot de passe :"
          alertMessage={alerts.password_confirmation}
        />

        <LetsGoButton backgroundColor="bg-green" text="C'EST PARTI" />

        <RegistrationLinks />
      </form>
    </>
  );
};

export default RegiterForm;
