import React from "react";

const Button = ({ content: Content, text, onclick, classNames = [] }) => {
  return (
    <button
      className={classNames.join(" ")}
      onClick={(event) => onclick(event)}
    >
      {text}
      {Content && <Content/>}
    </button>
  );
};

export default Button;
