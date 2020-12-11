import React from "react";

const FormGroup = ({
  colSpan,
  value,
  name,
  id,
  type,
  labelText,
  alertMessage,
  onInput,
  onBlur,
}) => {

  const handleInput = (value) => {
    return onInput(value);
  };
  const handleBlur = (value) => {
    return onBlur(value);
  };

  return (
    <div className={`form-group col-span-${colSpan} flex flex-col my-2`}>
      <label htmlFor={id} className="mb-1">
        {labelText}
      </label>
      <input
        id={id}
        type={type}
        name={name}
        value={value}
        onInput={(event) =>
          handleInput({ value: event.target.value, id: event.target.id })
        }
        onBlur={(event) =>
          handleBlur({ value: event.target.value, id: event.target.id })
        }
      />

      {alertMessage && (
        <div className="alert danger my-2 flex w-full justify-between">
          <p>{alertMessage}</p>
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0.5 16H17.5L9 1L0.5 16ZM10 14H8V12H10V14ZM10 11H8V7H10V11Z"
              fill="#DB4437"
            />
          </svg>
        </div>
      )}
    </div>
  );
};

export default FormGroup;
