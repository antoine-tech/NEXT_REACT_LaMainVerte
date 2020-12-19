import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { getClimates } from "../../../requests/climates";
import { getLocations } from "../../../requests/locations";
import {
  deleteGarden,
  getGarden,
  getGardenTypes,
  updateGarden,
} from "../../../requests/gardens";
import useJwtToken from "../../../hooks/useJwtToken";
import useIsLoading from "../../../hooks/useIsLoading";
import useFormAnalysis from "../../../hooks/useFormAnalysis";
import TextArea from "../../base_components/TextArea/index";
import Input from "../../base_components/Input/index";
import SliderInput from "../../SliderInput/index";
import Button from "../../base_components/Button/index";
import Select from "../../base_components/Select/index";
import IconLabel from "../../base_components/icons/IconLabel/index";
import IconClimate from "../../base_components/icons/IconClimate/index";
import IconLocation from "../../base_components/icons/IconLocation/index";
import FormGroup from '../../base_components/FormGroup/index';

const GardenEditionForm = ({
  gardenData,
  updateGardenData,
  setOpacityValue,
  setIsAmmendable,
}) => {
  const history = useHistory();
  const { garden_id } = useParams();
  const [climates, setClimates] = useState([]);
  const [gardenTypes, setGardenTypes] = useState([]);
  const [locations, setLocations] = useState([]);
  const { getJwtToken } = useJwtToken();
  const { isLoading, setIsLoading } = useIsLoading();
  const { datas, setDatas} = useFormAnalysis(
    {
      name: gardenData.garden.name,
      description: gardenData.garden.description,
      area: gardenData.garden.area,
      garden_type_id: gardenData.garden.garden_type_id,
      climate_id: gardenData.garden.climate_id,
      location_id: gardenData.garden.location_id,
      picture_opacity: gardenData.garden.picture_opacity,
      picture_url:gardenData.garden.picture_url
    },
    {
      isEmpty: "Ce champ est obligatoire",
    }
  );

  const [updatedDatas, setUpdatedDatas] = useState(datas);

  const handleDelete = async (gardenId) => {
    const confirm = window.confirm(
      "Voulez vous vraiment supprimer ce jardin ?"
    );

    if (confirm) {
      const response = await deleteGarden(gardenId, getJwtToken);
      history.push("/news_feed");
    }
  };

  const handleUpdate = async () => {
    let garden_type_id;
    let name;
    let area;
    let description;
    let climate_id;
    let location_id;
    let picture_opacity;

    if(updatedDatas.garden_type_id){
      garden_type_id = updatedDatas.garden_type_id;
    }else{
      garden_type_id = datas.garden_type_id;
    }

    if(updatedDatas.name){
      name = updatedDatas.name;
    }else{
      name = datas.name
    }

    if(updatedDatas.area){
      area = updatedDatas.area;
    }else{
      area = datas.area;
    }

    if(updatedDatas.description){
      description = updatedDatas.description;
    }else{
      description = datas.description;
    }

    if(updatedDatas.climate_id){
      climate_id = updatedDatas.climate_id;
    }else{
      climate_id = datas.climate_id;
    }

    if(updatedDatas.location_id){
      location_id = updatedDatas.location_id;
    }else{
      location_id = datas.location_id;
    }

    if(updatedDatas.picture_opacity){
      picture_opacity = updatedDatas.picture_opacity;
    }else{
      picture_opacity = datas.picture_opacity;
    }

    setIsLoading(true);
    const data = {
        garden: {
          garden_type_id: garden_type_id,
          name: name,
          area: parseInt(area),
          description : description,
          climate_id: climate_id,
          location_id: location_id,
          picture_opacity: picture_opacity
        },
      };

    const updatedGarden = await updateGarden(garden_id, data, getJwtToken);
    const garden = await getGarden(garden_id);
    updateGardenData(garden);
    setIsAmmendable(false);
    setIsLoading(false);
  };

  const handleOpacityValue = (value) => {
    setOpacityValue(1 - value / 100);
    setUpdatedDatas({ ...datas, picture_opacity: 1 - value / 100 })
  };

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

    setIsLoading("false");
  }, []);

  return (
    <div className='w-full grid grid-cols-2'>
      <FormGroup
        labelText="Nom du jardin"
        colSpan='2'
        id={"name"}
        name={"name"}
        type={"text"}
        placeHolder={"Un ptit nom sympa pour votre jardin ?"}
        classNames={["w-full my-2"]}
        value={updatedDatas.name}
        onInput={(obj) => setUpdatedDatas({ ...datas, name: obj.value })}
      />

      <FormGroup
        labelText="Surface du jardin"
        colSpan='2'
        id={"area"}
        name={"area"}
        type={"number"}
        placeHolder={"Quelle est la surface de votre jardin ?"}
        classNames={["w-full my-2"]}
        value={updatedDatas.area}
        onInput={(obj) => setUpdatedDatas({ ...datas, area: obj.value })}
      />

      <TextArea
        id="description"
        name="description"
        classNames={["col-span-2 my-4"]}
        value={updatedDatas.description}
        onInput={(obj) => setUpdatedDatas({ ...datas, description: obj.value })}
      />

      <Select
        id="garden_type_id"
        name="garden_type_id"
        classNames={["col-span-2"]}
        icon={IconLabel}
        prompter="Quel est le type de votre jardin ?"
        options={gardenTypes.map((gardenType) => {
          return { id: gardenType.id, text: gardenType.name };
        })}
        selectedOption={(garden_type_id) =>
          setUpdatedDatas({ ...datas, garden_type_id: garden_type_id })
        }
      />

      <Select
        id="climate_id"
        name="climate_id"
        classNames={["col-span-2"]}
        icon={IconClimate}
        prompter="Quel est votre climat ?"
        options={climates.map((climate) => {
          return { id: climate.id, text: climate.name };
        })}
        selectedOption={(climate_id) =>
          setUpdatedDatas({ ...datas, climate_id: climate_id })
        }
      />

      <Select
        id="location_id"
        name="location_id"
        classNames={["col-span-2"]}
        icon={IconLocation}
        prompter="Où vous situez vous ? "
        options={locations.map((location) => {
          return { id: location.id, text: location.name };
        })}
        selectedOption={(location_id) =>
          setUpdatedDatas({ ...datas, location_id: location_id })
        }
      />

      <SliderInput
        classNames={["my-4"]}
        label="Modifier l'opacité de la photo d'arrière plan :"
        opacityValue={(value) => handleOpacityValue(value)}
      />

      <Button
        text="METTRE A JOUR"
        classNames={[
          "btn",
          "btn-lg",
          "bg-blue-dark",
          "text-white",
          "p-4",
          "col-span-2",
          "col-span-4",
          "lg:col-span-2",
          "my-4",
        ]}
        onclick={() => handleUpdate(garden_id)}
      />

      <Button
        text="SUPPRIMER"
        classNames={[
          "btn",
          "btn-lg",
          "bg-red",
          "text-white",
          "p-4",
          "col-span-2",
          "col-span-4",
          "lg:col-span-2",
          "my-4",
        ]}
        onclick={() => handleDelete(garden_id)}
      />
    </div>
  );
};

export default GardenEditionForm;
