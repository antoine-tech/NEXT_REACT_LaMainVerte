import React from "react";

const TextArea = ({ id, name, cols, rows, classNames, value, onInput, onBlur }) => {

  const handleInput = (value) => {
    return onInput(value);
  };
  const handleBlur = (value) => {
    return onBlur(value);
  };
  return (
    <textarea
      name={name}
      id={id}
      cols={cols}
      rows={rows}
      className={classNames ? classNames.join(" ") : ""}
      onInput={(event) =>
        onInput &&
        handleInput({ value: event.target.value, id: event.target.id })
      }
      onBlur={(event) =>
        onBlur && handleBlur({ value: event.target.value, id: event.target.id })
      }
      value={value}
    >
    </textarea>
  );
};

export default TextArea;
