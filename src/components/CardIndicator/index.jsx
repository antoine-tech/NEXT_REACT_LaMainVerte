import React from "react";
import "./index.scss";

const CardIndicator = ({
  icon: Icon,
  dataText,
  onClick,
  classNames,
  title,
}) => {
  return (
    <div
      className={`card-indicator my-4 ${classNames ? classNames.join() : ""}`}
      onClick={() => onClick()}
      title={title ? title : ""}
    >
      <Icon />

      <h5>{dataText}</h5>
    </div>
  );
};

export default CardIndicator;
