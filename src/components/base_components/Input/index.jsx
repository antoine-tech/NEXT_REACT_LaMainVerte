import React from "react";

const Input = ({
  id,
  type,
  name,
  value,
  placeHolder,
  onInput,
  onBlur,
  classNames,
}) => {
  const handleInput = (value) => {
    return onInput(value);
  };
  const handleBlur = (value) => {
    return onBlur(value);
  };
  return (
    <input
      id={id}
      type={type}
      name={name}
      value={value}
      placeholder={placeHolder}
      onInput={(event) =>
        onInput &&
        handleInput({ value: event.target.value, id: event.target.id })
      }
      onBlur={(event) =>
        onBlur && handleBlur({ value: event.target.value, id: event.target.id })
      }
      className={classNames ? classNames.join(" ") : ""}
    />
  );
};

export default Input;
