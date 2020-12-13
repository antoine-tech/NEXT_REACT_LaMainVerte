import React from "react";
import IconArrowDown from "../icons/IconArrowDown/index";

const Select = ({ icon: Icon, prompter, options, selectedOption }) => {
  const handleChange = (event) => {
    return selectedOption(event.target.value);
  };
  return (
    <div className="grid grid-cols-12 w-full my-4">
      <div className="prepend col-span-1 flex items-center justify-center">
        <Icon />
      </div>
      <select
        name=""
        id=""
        className="col-span-10 pl-4"
        onChange={handleChange}
      >
        <option value="" disabled selected hidden>
          {prompter}
        </option>
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
