import React from "react";
import Input from '../base_components/Input/index';


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
  return (
    <div className={`form-group col-span-${colSpan} flex flex-col my-2`}>
      <label htmlFor={id} className="mb-1">
        {labelText}
      </label>
        <Input
          id={id}
          type={type}
          name={name}
          value={value}
          onInput={onInput ? (value) => onInput(value) : ''}
          onBlur={onBlur ? (value) => onBlur(value) : ''}
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
    )};

    export default FormGroup;
