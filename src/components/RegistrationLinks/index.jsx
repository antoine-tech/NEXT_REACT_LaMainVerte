import React from "react";
import { Link } from "react-router-dom";

const RegistrationLinks = () => {
  return (
    <div className="w-full my-4 flex flex-col">
      <Link to="/login" className="hover:underline">Connexion</Link>
      <Link to="/register" className="hover:underline">Inscription</Link>
    </div>
  );
};

export default RegistrationLinks;
