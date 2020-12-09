import React, { useState } from "react";
import LaMainVerteBrand from "../../LaMainVerteBrand /index";
import FormGroup from "../../FormGroup/index";
import useFormAnalysis from "../../../hooks/useFormAnalysis";

const LoginForm = () => {
  const { userDatas, alerts, handleInput, handleBlur } = useFormAnalysis();

  return (
    <>
      <LaMainVerteBrand />
      <form action="" className="grid grid-cols-2 gap-4">
        <h1 className="col-span-2 my-8">De retour parmi nous ?</h1>

        <FormGroup
          colSpan="1"
          onInput={(value) => handleInput(value)}
          onBlur={(value)=>handleBlur(value)}
          value={userDatas.lastname}
          name="lastname"
          id="lastname"
          type="text"
          labelText="Nom :"
          alertMessage={alerts.lastname}
        />

        <FormGroup
          colSpan="1"
          onInput={(value) => handleInput(value)}
          onBlur={(value)=>handleBlur(value)}
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
          onBlur={(value)=>handleBlur(value)}
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
          onBlur={(value)=>handleBlur(value)}
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
          onBlur={(value)=>handleBlur(value)}
          value={userDatas.password_confirmation}
          name="password_confirmation"
          id="password_confirmation"
          type="password"
          labelText="Confirmer le mot de passe :"
          alertMessage={alerts.password_confirmation}
        />
      </form>
    </>
  );
};

export default LoginForm;
