import React from "react";
import avatar_default from "../../../assets/img/avatar_default.jpeg";
import IconCamera from "../../base_components/icons/IconCamera";
import "./index.scss";

const ProfileAvatar = ({ avatar_url, hoverCamera = false }) => {
  return (
    <div id="user-avatar" className="flex items-center justify-center">
      <div className="avatar-img flex items-center justify-center relative">
        {avatar_url ? (
          <img
            src={avatar_url}
            alt="avatar"
            className="rounded-full h-full w-full"
          />
        ) : (
          <img
            src={avatar_default}
            alt="avatar"
            className="rounded-full h-full w-full"
          />
        )}

        {hoverCamera && (
          <IconCamera classNames={["absolute", "hover-camera"]} />
        )}
      </div>
    </div>
  );
};

export default ProfileAvatar;
