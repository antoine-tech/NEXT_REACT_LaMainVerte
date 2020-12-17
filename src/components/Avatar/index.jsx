import React from "react";
import "./index.scss";

const Avatar = ({ imageSrc, userName, type }) => {
  return (
    <>
      <div className={type ? `suggestion-avatar-${type}` : "suggestion-avatar"}>
        <div className="avatar-img">
          <img
            src={imageSrc}
            className="h-full w-full rounded-full"
            alt="avatar"
          />
        </div>
      </div>

      {userName && (
        <p className="my-4 font-blue-dark-light font-sm ml-2">{userName}</p>
      )}
    </>
  );
};

export default Avatar;
