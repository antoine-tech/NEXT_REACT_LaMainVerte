import React from "react";

const Button = ({ text, onclick, classNames = [] }) => {
  return (
    <button className={classNames.join(" ")} onClick={(event) => onclick(event)}>
      {text}
    </button>
  );
};

export default Button;
