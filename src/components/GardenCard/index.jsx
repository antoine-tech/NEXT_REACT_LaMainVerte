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
    <div className="card p-4" id={id} onClick={(event) => handleRedirect(id)}>
      <div
        className="card-image"
        style={{
          backgroundImage: `url(https://images.pexels.com/photos/827518/pexels-photo-827518.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500)`,
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
          <DataContainer
            icon={IconLabel}
            dataText={garden_type?.name}
          />
          <DataContainer
            icon={IconLocation}
            dataText={location?.name}
          />
        </div>

      </div>
      <div className="card-footer p-4 flex items-center justify-between">
        <h4 className="italic">{name?.toUpperCase()}</h4>{" "}
        <h5>{user?.first_name}</h5>
      </div>
    </div>
  );
};

export default GardenCard;
