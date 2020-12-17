import React, { useEffect, useState } from "react";
import { createGarden } from "../../../requests/gardens";
import useFormAnalysis from "../../../hooks/useFormAnalysis";
import useIsToogled from "../../../hooks/useIsToogled";
import useJwtToken from "../../../hooks/useJwtToken";
import usePageStatus from "../../../hooks/usePageStatus";
import { uploadToAWS } from "../../../sevices/Api";
import { getClimates } from "../../../requests/climates";
import { getGardenTypes } from "../../../requests/gardens";
import { getLocations } from "../../../requests/locations";
import { useHistory } from "react-router-dom";
import LoadingAnimation from '../../loaders/LoadingAnimation/index';
import Select from '../../base_components/Select/index';
import FormGroup from "../../FormGroup";
import LetsGoButton from '../../base_components/buttons/LetsGoButton/index';
import IconClimate from '../../base_components/icons/IconClimate/index';
import IconLocation from '../../base_components/icons/IconLocation/index';

const GardenForm = ({ droppedImage }) => {

  const history = useHistory();
  const { pageStatus, setPageStatus } = usePageStatus();
  const [climates, setClimates] = useState([]);
  const [gardenTypes, setGardenTypes] = useState([]);
  const [locations, setLocations] = useState([]);
  const { datas, alerts, setDatas, handleInput, handleBlur } = useFormAnalysis(
    { name: "", area: "", climate_id: "", location_id: "" },
    {}
  );
  const { getJwtToken } = useJwtToken();
  const { isToogled, handleChange } = useIsToogled();

  useEffect(() => {
    const fetchClimates = async () => {
      try {
        const fetchedClimates = await getClimates();
        setClimates(fetchedClimates);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchGardenTypes = async () => {
      try {
        const fetchedGardenTypes = await getGardenTypes();
        setGardenTypes(fetchedGardenTypes);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchLocations = async () => {
      try {
        const fetchedLocations = await getLocations();
        setLocations(fetchedLocations);
      } catch (error) {
        console.error(error);
      }
    };

    fetchGardenTypes();
    fetchClimates();
    fetchLocations();

    setPageStatus("loaded");
  }, []);

  useEffect(() => {
    if (locations.length > 0 && climates.length > 0) {
      setDatas({
        ...datas,
        location_id: locations[0].id,
        climate_id: climates[0].id,
      });
    }
  }, [locations, climates]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const image_url = droppedImage
      ? await uploadToAWS(getJwtToken, droppedImage[0], "la-main-verte")
      : "";


    const newGarden = {
      garden: {
        garden_type_id: isToogled ? 1 : 2,
        name: datas.name,
        area: datas.area,
        climate_id: datas.climate_id,
        location_id: datas.location_id,
        picture_url:image_url,
      },
    };

    const response = await createGarden(newGarden, getJwtToken);
    const createdGardenId = response.id;
    history.push(`/garden/${createdGardenId}`);
  };

  if (pageStatus === "loading") {
    return <LoadingAnimation />;
  } else if (pageStatus === "loaded") {
    return (
      <div>
        <h1 className="my-5">Partager mon jardin</h1>

        <form className="grid grid-cols-2 gap-4 my-2" onSubmit={handleSubmit}>
          <ul className="garden-toogle">
            <li>Urban</li>
            <li>
              <div className="toogleSwitch toogleGarden">
                <input type="checkbox" onChange={handleChange}></input>
                <div className="switch"></div>
              </div>
            </li>
            <li>Rural</li>
          </ul>
          <FormGroup
            colSpan="2"
            value={datas.name}
            name="name"
            id="name"
            type="text"
            labelText="Nom du potager :"
            alertMessage={alerts.name}
            onInput={(value) => handleInput(value)}
            onBlur={(value) => handleBlur(value)}
          />
          <FormGroup
            colSpan="2"
            value={datas.area}
            name="area"
            id="area"
            type="text"
            labelText="Superficie (en m2)"
            alertMessage={alerts.area}
            onInput={(value) => handleInput(value)}
            onBlur={(value) => handleBlur(value)}
          />

          <Select
            classNames={["col-span-2"]}
            name="climate_id"
            id="climate_id"
            icon={IconClimate}
            prompter="Quel est votre climat ?"
            options={climates.map((climate) => {
              return { id: climate.id, text: climate.name };
            })}
            selectedOption={(climate_id) =>
              setDatas({ ...datas, climate_id: climate_id })
            }
          />

          <Select
            classNames={["col-span-2"]}
            name="location_id"
            id="location_id"
            icon={IconLocation}
            prompter="Où vous situez vous ? "
            options={locations.map((location) => {
              return { id: location.id, text: location.name };
            })}
            selectedOption={(location_id) =>
              setDatas({ ...datas, location_id: location_id })
            }
          />

          <LetsGoButton backgroundColor="bg-blue" text="C'EST PARTI" />
        </form>
      </div>
    );
  } else if (pageStatus === "error") {
    // ERROR
  }
};
export default GardenForm;
