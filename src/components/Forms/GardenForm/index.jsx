import React, { useEffect, useState } from "react";
import FormGroup from "../../FormGroup";
import useFormAnalysis from "../../../hooks/useFormAnalysis";
import LetsGoButton from "../../buttons/LetsGoButton/index";
import { createGarden } from "../../../requests/gardens";
import useIsToogled from "../../../hooks/useIsToogled";
import useJwtToken from "../../../hooks/useJwtToken";
import { uploadToAWS } from "../../../sevices/Api";
import Select from "../../Select/index";
import IconClimate from "../../icons/IconClimate/index";
import { getClimates } from "../../../requests/climates";
import { getGardenTypes } from "../../../requests/gardens";

const GardenForm = ({ droppedImage }) => {
  const [climates, setClimates] = useState([]);
  const [gardenTypes, setGardenTypes] = useState([]);
  const { datas, alerts, handleInput, handleBlur } = useFormAnalysis(
    { name: "", area: "", climate: "", location: "" },
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

    fetchGardenTypes();
    fetchClimates();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const image_url = await uploadToAWS(
      getJwtToken,
      droppedImage[0],
      "la-main-verte"
    );

    const newGarden = {
      garden: {
        garden_type_id: isToogled ? 1 : 2,
        name: datas.name,
        area: datas.area,
        climate: parseInt(datas.climate_id),
        location: parseInt(datas.location),
        image_url: image_url,
      },
    };

    const response = await createGarden(newGarden, getJwtToken);
    console.log(response);
  };

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
          name="climate"
          id="climate"
          icon={IconClimate}
          prompter="Quel est votre climat ?"
          options={climates.map((climate) => {
            return { id: climate.id, text: climate.name };
          })}
          selectedOption={(value) => console.log(value)}
        />

        <FormGroup
          colSpan="2"
          value={datas.location}
          name="location"
          id="location"
          type="text"
          labelText="Lieu"
          alertMessage={alerts.location}
          onInput={(value) => handleInput(value)}
          onBlur={(value) => handleBlur(value)}
        />

        <LetsGoButton backgroundColor="bg-blue" text="C'EST PARTI" />
      </form>
    </div>
  );
};
export default GardenForm;
