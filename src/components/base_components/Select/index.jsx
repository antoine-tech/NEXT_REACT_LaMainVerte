import React, { useEffect } from "react";
import IconArrowDown from '../icons/IconArrowDown/index';
import './index.scss'

const Select = ({
  id,
  name,
  icon: Icon,
  prompter,
  options,
  selectedOption,
  classNames,
}) => {
  useEffect(() => {
    selectedOption("");
  }, []);

  const handleChange = (event) => {
    return selectedOption(
      Array.from(event.target.selectedOptions)[0].value
    );
  };
  return (
    <div
      className={`grid grid-cols-12 w-full my-4 ${
        classNames ? classNames.join() : ""
      }`}
    >
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
        <option value="">{prompter}</option>
        {options?.map((option, index) => {
          let { id, text } = option;
          return (
            <option key={`option-${id}`} value={id}>
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
