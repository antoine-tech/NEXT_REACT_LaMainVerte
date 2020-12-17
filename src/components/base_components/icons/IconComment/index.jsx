import React from "react";

const IconComment = ({ onclick }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="iconComment"
      onClick={() => onclick()}
    >
      <g id="comment_24px">
        <path
          id="icon/communication/comment_24px"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M20 2C21.1 2 21.99 2.89999 21.99 4L22 22L18 18H4C2.90002 18 2 17.1 2 16V4C2 2.89999 2.90002 2 4 2H20ZM7 14H17C17.55 14 18 13.55 18 13C18 12.45 17.55 12 17 12H7C6.45001 12 6 12.45 6 13C6 13.55 6.45001 14 7 14ZM17 11H7C6.45001 11 6 10.55 6 10C6 9.45001 6.45001 9 7 9H17C17.55 9 18 9.45001 18 10C18 10.55 17.55 11 17 11ZM7 8H17C17.55 8 18 7.54999 18 7C18 6.45001 17.55 6 17 6H7C6.45001 6 6 6.45001 6 7C6 7.54999 6.45001 8 7 8Z"
          fill="#3A405A"
          fillOpacity="0.54"
        />
      </g>
    </svg>
  );
};

export default IconComment;
