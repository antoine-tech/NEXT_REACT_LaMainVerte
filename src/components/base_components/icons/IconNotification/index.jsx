import React from "react";

const IconNotification = ({ notificationNumber, onClick }) => {
  return (
    <div className="flex">
      {notificationNumber > 0 ? (
        <>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ cursor: "pointer" }}
            onClick={onClick}
          >
            <g id="notifications_active_24px">
              <path
                id="icon/social/notifications_active_24px"
                fillRule="evenodd"
                clipRule="evenodd"
                d="M18.0038 10.75V15.75L19.2838 17.04C19.9138 17.67 19.4638 18.75 18.5738 18.75H5.40379C4.51377 18.75 4.07383 17.67 4.70384 17.04L6.00377 15.75V10.75C6.00377 7.67001 7.63377 5.10999 10.5038 4.42999V3.75C10.5038 2.92001 11.1638 2.25 11.9938 2.25C12.8238 2.25 13.5038 2.92001 13.5038 3.75V4.42999C16.3638 5.10999 18.0038 7.67999 18.0038 10.75ZM13.9939 19.75C13.9939 20.85 13.0939 21.75 11.9939 21.75C10.8839 21.75 9.99388 20.85 9.99388 19.75H13.9939ZM6.77391 4.48001C7.19383 4.10001 7.20384 3.45001 6.80381 3.04999C6.42381 2.67001 5.80381 2.66 5.41392 3.03C3.70384 4.59 2.52391 6.70999 2.1439 9.09C2.05381 9.70001 2.52391 10.25 3.1439 10.25C3.62388 10.25 4.0438 9.89999 4.12388 9.42001C4.42381 7.48001 5.38389 5.75 6.77391 4.48001ZM17.2038 3.04999C17.5838 2.67001 18.2038 2.66 18.6039 3.03C20.3038 4.60001 21.4739 6.70999 21.8539 9.07999C21.9538 9.69 21.4739 10.24 20.8639 10.24C20.3738 10.24 19.9538 9.88998 19.8838 9.41C19.5838 7.47 18.6139 5.73999 17.2339 4.47C16.8238 4.09 16.8038 3.45001 17.2038 3.04999Z"
                fill="black"
                fillOpacity="1"
              />
            </g>
          </svg>

          <span><sup className="rounded-full bg-red text-white p-2 h-4 w-4 flex items-center justify-center">{notificationNumber}</sup></span>
        </>
      ) : (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ cursor: "pointer" }}
          onClick={onClick}
        >
          <g id="notifications_24px">
            <path
              id="icon/social/notifications_24px"
              fillRule="evenodd"
              clipRule="evenodd"
              d="M18.0012 10.75V15.75L19.2912 17.04C19.9213 17.67 19.4713 18.75 18.5813 18.75H5.41124C4.52123 18.75 4.08128 17.67 4.71129 17.04L6.00121 15.75V10.75C6.00121 7.67001 7.63121 5.10999 10.5012 4.42999V3.75C10.5012 2.92001 11.1713 2.25 12.0012 2.25C12.8313 2.25 13.5012 2.92001 13.5012 3.75V4.42999C16.3613 5.10999 18.0012 7.67999 18.0012 10.75ZM14.0012 19.75C14.0012 20.85 13.1012 21.75 12.0012 21.75C10.8912 21.75 10.0012 20.85 10.0012 19.75H14.0012Z"
              fill="black"
              fillOpacity="0.54"
            />
          </g>
        </svg>
      )}
    </div>
  );
};

export default IconNotification;
