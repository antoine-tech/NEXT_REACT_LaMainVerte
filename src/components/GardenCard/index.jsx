import React from "react";
import DataContainer from "../DataContainer/index";
import IconClimate from "../icons/IconClimate/index";
import IconLabel from "../icons/IconLabel";
import IconUpdate from "../icons/IconUpdate";
import IconLocation from "../icons/IconLocation/index";
import { useHistory } from "react-router-dom";
import Moment from "react-moment";

const GardenCard = ({
  id,
  name,
  picture_url,
  picture_opacity,
  user,
  climate,
  location,
  garden_type,
  created_at,
  updated_at,
}) => {
  const history = useHistory();

  const handleRedirect = (id) => {
    history.push("/garden/" + id);
  };

  return (
    <div
      className="card card-garden p-4"
      id={`garden-${id}`}
      onClick={(event) => handleRedirect(id)}
    >
      <div
        className="card-image"
        style={{
          backgroundImage: `url(${picture_url})`,
        }}
      >
        <div className="garden-datas">
          <DataContainer
            icon={IconUpdate}
            dataText={
              <Moment format="DD/MM:YYYY à hh:mm:ss">{updated_at}</Moment>
            }
          />
          <DataContainer icon={IconClimate} dataText={climate?.name} />
          <DataContainer icon={IconLabel} dataText={garden_type?.name} />
          <DataContainer icon={IconLocation} dataText={location?.name} />
        </div>
      </div>
      <div className="card-footer p-4 flex items-center justify-between">
        <h4>{name?.toUpperCase()}</h4>{" "}
        <h4 className="italic">Par {user?.username}</h4>
      </div>
    </div>
  );
};

export default GardenCard;
