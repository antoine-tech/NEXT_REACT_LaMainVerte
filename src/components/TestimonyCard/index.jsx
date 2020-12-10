import React from "react";
import Moment from "react-moment";

const TestimonyCard = ({ id, content, user, created_at, updated_at }) => {
  return (
    <div className="testimony-card grid grid-cols-8 p-4 my-4" id={id}>
      <div className="col-span-2 flex items-center">
        <div className="suggestion-avatar-half">
          <div className="avatar-img"></div>
        </div>
      </div>

      <div className="col-span-6 flex flex-col justify-center grid grid-cols-2">
        <h5 className="col-span-1">{user?.first_name}</h5>
        <h5 className="col-span-1">
          <Moment format="DD/MM/YYYY à hh:mm:ss">{created_at}</Moment>
        </h5>
        <p className="col-span-2 my-2">{content}</p>
      </div>
    </div>
  );
};

export default TestimonyCard;
