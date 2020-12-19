import React from "react";

const ToogleSwitch = ({ onchange }) => {
  const handleChange = () => {
    onchange();
  };
  return (
    <div className="toogleSwitch">
      <input type="checkbox" onChange={handleChange}></input>
      <div className="switch"></div>
    </div>
  );
};

export default ToogleSwitch