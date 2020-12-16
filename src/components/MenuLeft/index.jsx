import React from "react";
import SettingIcon from "../icons/SettingIcon/index";
import ToogleSwitch from "../ToogleSwitch/index";
import { Link } from "react-router-dom";

const MenuLeft = ({ current_user, handleMenuToogle, handleSignAction }) => {
  return (
    <div className="fixed top-0 w-full min-h-screen flex flex-col items-center justify-center bg-green z-40">
      <SettingIcon
        onClick={() => handleMenuToogle()}
        classNames={["absolute", "top-2", "right-2"]}
      />
      {current_user ? (
        <div className="flex flex-col p-4 items-center justify-center">
          <Link to="/profil" className="text-2xl my-4" title="Mon profil">
            Mon profil
          </Link>

          <Link to="/admin" className="text-2xl my-4" title="Administrateur">
            Administrateur
          </Link>

          <li className="flex flex-col items-center justify-center">
            <ToogleSwitch onchange={() => handleSignAction(current_user)} />
          </li>
        </div>
      ) : (
        <div className="flex flex-col p-4">
          <Link to="/login" className="text-2xl my-4" title="Se connecter">
            Connexion
          </Link>

          <Link
            to="/register"
            className="text-2xl my-4"
            title="Créer un compte"
          >
            Inscription
          </Link>
        </div>
      )}
    </div>
  );
};

export default MenuLeft;
