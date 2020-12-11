import React from "react";

const Button = ({ text, classNames = [] }) => {
  return <button className={classNames.join(" ")}>{text}</button>;
};

export default Button;
