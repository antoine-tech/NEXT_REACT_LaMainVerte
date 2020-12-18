import React from "react";

const Button = ({ content: Content, text, onclick, classNames = [], type }) => {
  return (
    <button
      className={classNames.join(" ")}
      onClick={(event) => onclick(event)}
      type={type ? type : ""}
    >
      {text}
      {Content && <Content />}
    </button>
  );
};

export default Button;
