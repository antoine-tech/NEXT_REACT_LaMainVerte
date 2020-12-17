import React from "react";
import "./index.scss";

const CardIndicator = ({ icon: Icon, dataText, onClick }) => {
  return (
    <div className="card-indicator my-4" onClick={() => onClick()}>
      <Icon />

      <h5>{dataText}</h5>
    </div>
  );
};

export default CardIndicator;
