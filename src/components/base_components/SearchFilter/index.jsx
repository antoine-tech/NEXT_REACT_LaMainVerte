import React from "react";
import "./index.scss";

const SearchFilter = ({ type, label, id, name, onChange }) => {
  const handleChange = (type, id) => {
    return onChange({ id: id, type: type });
  };
  return (
    <div className="checkbox-group flex items-center">
      <input
        type="checkbox"
        id={id}
        name={name}
        onChange={(type, id) => handleChange(type, id)}
      />
      <label htmlFor="" className="ml-2">
        {label}
      </label>
    </div>
  );
};

export default SearchFilter;
