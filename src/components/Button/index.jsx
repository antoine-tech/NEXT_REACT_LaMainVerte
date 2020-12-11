import React from "react";

const Button = ({ text, onclick, classNames = [] }) => {
  return (
    <button className={classNames.join(" ")} onClick={() => onclick()}>
      {text}
    </button>
  );
};

export default Button;
