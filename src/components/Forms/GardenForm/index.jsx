import React from 'react';
import FormGroup from '../../FormGroup';
import useFormAnalysis from "../../../hooks/useFormAnalysis";
import LetsGoButton from '../../buttons/LetsGoButton/index';


const GardenForm = () => {
  const { gardenData, alerts, handleInput, handleBlur } = useFormAnalysis();


  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      gardenName,
      area,
      soil,
      climate,
      address,
      country,
    } = gardenData;

    const response = await 
  }

  return (
    <div>
      <h1 className="col-span-2 my-2">Partager mon jardin</h1>

      <form
        className="grid grid-cols-2 gap-4 my-2"
        onSubmit={handleSubmit}
      >
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
          labelText="Superficie"
          alertMessage={alerts.area}
          onInput={(value) => handleInput(value)}

        />
        <FormGroup
          colSpan="1"
          value={gardenData.soil}
          name="soil"
          id="soil"
          type="text"
          labelText="Type de sol"
          alertMessage={alerts.soil}
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
          value={gardenData.address}
          name="address"
          id="address"
          type="text"
          labelText="Adresse (optionnel)"
          alertMessage={alerts.address}
          onInput={(value) => handleInput(value)}
        />
        <FormGroup
          colSpan="2"
          value={gardenData.country}
          name="country"
          id="country"
          type="text"
          labelText="country"
          alertMessage={alerts.country}
          onInput={(value) => handleInput(value)}
          onBlur={(value) => handleBlur(value)}
        />

        <LetsGoButton backgroundColor="bg-blue" text="C'EST PARTI" />
      </form>
    </div>
  )
}
export default GardenForm;
