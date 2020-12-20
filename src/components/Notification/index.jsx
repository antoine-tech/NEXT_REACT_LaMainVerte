import React from "react";
import Moment from "react-moment";
import Avatar from "../avatars/Avatar/index";
import { useHistory } from 'react-router-dom';
const Notification = ({
  label,
  pathName,
  type,
  content: { id, author, gardenId, teaser, created_at },
}) => {

  const history = useHistory()
  return (

    <>
    
    <p className="my-4 text-left w-full bg-light-brown p-2 radius">Nouveau {label}</p>

    <div
      className="notification grid grid-cols-12 p-4 my-2 border-gray-200 bg-white"
      style={{ borderWidth: "1px" }}
      id={`notification-${type}-${id}`}
      onClick={()=>history.push(pathName)}
    >
      <div className="col-span-12 flex justify-between">
        <div className="flex items-center">
          <Avatar
            type="half"
            imageSrc={author.avatar_url}
            userName={author.username}
          />
        </div>
        <h5 className="flex items-center">
          <Moment
            format="DD/MM/YYYY à hh:mm:ss"
            className="block w-full text-right italic font-blue-dark-light font-sm"
          >
            {created_at}
          </Moment>
        </h5>
      </div>

      <p className="col-span-12 flex my-4">{teaser}</p>
    </div>

    </>
  );
};

export default Notification;
