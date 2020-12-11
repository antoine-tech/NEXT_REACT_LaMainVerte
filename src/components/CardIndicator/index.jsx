import React from "react";

const CardIndicator = ({ icon: Icon, dataText }) => {
  return (
    <div className="card-indicator my-4">
      <Icon />

      <h5>{dataText}</h5>
    </div>
  );
};

export default CardIndicator;
