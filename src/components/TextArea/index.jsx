import React from "react";

const TextArea = ({ id, name, cols, rows, classNames, value, oninput }) => {
  return (
    <textarea
      name={name}
      id={id}
      cols={cols}
      rows={rows}
      className={classNames ? classNames.join(" ") : ""}
      onInput={(event) => oninput(event)}
    >
      {value}
    </textarea>
  );
};

export default TextArea;
