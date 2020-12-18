import React from "react";

const IconDelete = ({ onClick }) => {
  return (
    <svg
      width="25"
      height="25"
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
      style={{ cursor: "pointer" }}
    >
      <g id="delete_outline_24px">
        <path
          id="icon/action/delete_outline_24px"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M14.79 3.28999L15.5 4H18C18.55 4 19 4.45 19 5C19 5.55 18.55 6 18 6H6C5.44995 6 5 5.55 5 5C5 4.45 5.44995 4 6 4H8.5L9.20996 3.28999C9.39001 3.11 9.65002 3 9.91003 3H14.09C14.35 3 14.61 3.11 14.79 3.28999ZM6 19C6 20.1 6.90002 21 8 21H16C17.1 21 18 20.1 18 19V9C18 7.89999 17.1 7 16 7H8C6.90002 7 6 7.89999 6 9V19ZM9 9H15C15.55 9 16 9.45 16 10V18C16 18.55 15.55 19 15 19H9C8.44995 19 8 18.55 8 18V10C8 9.45 8.44995 9 9 9Z"
          fill="#3A405A"
          fillOpacity="0.54"
        />
      </g>
    </svg>
  );
};

export default IconDelete;
