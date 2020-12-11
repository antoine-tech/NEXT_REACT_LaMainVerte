import React, { useState, useEffect } from 'react';
import FormGroup from '../../FormGroup';
import useFormAnalysis from "../../../hooks/useFormAnalysis";
import LetsGoButton from '../../buttons/LetsGoButton/index';
import { createGarden } from '../../../requests/gardens';
import useIsToogled from '../../../hooks/useIsToogled';
import useJwtToken from '../../../hooks/useJwtToken';

const GardenForm = () => {
  const { gardenData, alerts, handleInput, handleBlur } = useFormAnalysis();

  const {
    isToogled,
    handleChange,
  } = useIsToogled()

  const { getJwtToken } = useJwtToken();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const handleGarden = {
      garden: {
        garden_type_id: isToogled ? 1 : 2,
        name: gardenData.gardenName,
        area: gardenData.area,
        climate: parseInt(gardenData.climate),
        location: parseInt(gardenData.location)
      }
    };

    console.log(handleGarden);

    const response = await createGarden(gardenData, getJwtToken);
    console.log(response);
  }

  return (
    <div>
      <h1 className="col-span-2 my-5">Partager mon jardin</h1>

      <form
        className="grid grid-cols-2 gap-4 my-2"
        onSubmit={handleSubmit}
      >
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
          value={gardenData.gardenName}
          name="gardenName"
          id="gardenName"
          type="text"
          labelText="Nom du potager :"
          alertMessage={alerts.gardenName}
          onInput={(value) => handleInput(value)}
          onBlur={(value) => handleBlur(value)}
        />
        <FormGroup
          colSpan="2"
          value={gardenData.area}
          name="area"
          id="area"
          type="text"
          labelText="Superficie (en m2)"
          alertMessage={alerts.area}
          onInput={(value) => handleInput(value)}
        />
        <FormGroup
          colSpan="1"
          value={gardenData.climate}
          name="climate"
          id="climate"
          type="text"
          labelText="Climat"
          alertMessage={alerts.climate}
          onInput={(value) => handleInput(value)}
          onBlur={(value) => handleBlur(value)}
        />
        <FormGroup
          colSpan="2"
          value={gardenData.location}
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
  )
}
export default GardenForm;
