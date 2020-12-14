import React from "react";
import IconArrowDown from "../icons/IconArrowDown/index";

const Select = ({
  id,
  name,
  icon: Icon,
  prompter,
  options,
  selectedOption,
  classNames,
}) => {
  const handleChange = (event) => {
    return selectedOption(event.target.value);
  };
  return (
    <div
      className={`grid grid-cols-12 w-full my-4 ${
        classNames ? classNames.join() : ""
      }`}
    >
      <p style={{ fontSize: "1rem" }} className="col-span-12 my-4">
        {prompter}
      </p>
      <div className="prepend col-span-1 flex items-center justify-center">
        <Icon />
      </div>
      <select
        name={name}
        id={id}
        className="col-span-10 pl-4"
        onChange={handleChange}
        defaultValue={prompter}
      >
        {options.map((option) => {
          let { value, text } = option;
          return (
            <option key={`option-${value}`} value={value}>
              {text}
            </option>
          );
        })}
      </select>
      <div className="append col-span-1 flex items-center justify-center">
        <IconArrowDown />
      </div>
    </div>
  );
};

export default Select;
