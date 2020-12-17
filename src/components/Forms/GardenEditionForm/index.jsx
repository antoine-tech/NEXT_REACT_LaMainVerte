import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getClimates } from "../../../requests/climates";
import { getLocations } from "../../../requests/locations";
import { getGardenTypes, updateGarden } from "../../../requests/gardens";
import useIsLoading from "../../../hooks/useIsLoading";
import useFormAnalysis from "../../../hooks/useFormAnalysis";
import TextArea from "../../base_components/TextArea/index";
import Input from "../../base_components/Input/index";
import SliderInput from "../../SliderInput/index";
import Button from "../../base_components/Button/index";
import Select from "../../base_components/Select/index";
import IconLabel from "../../base_components/icons/IconLabel/index";
import IconClimate from "../../base_components/icons/IconClimate/index";
import IconUpdate from "../../base_components/icons/IconUpdate/index";
import IconLocation from "../../base_components/icons/IconLocation/index";
import { update } from "../../../sevices/Api";
import useJwtToken from '../../../hooks/useJwtToken';

const GardenEditionForm = ({gardenData, updateGardenData, setOpacityValue, setIsAmmendable }) => {
  const { garden_id } = useParams();
  const [climates, setClimates] = useState([]);
  const [gardenTypes, setGardenTypes] = useState([]);
  const [locations, setLocations] = useState([]);
  const {getJwtToken} = useJwtToken();
  const { isLoading, setIsLoading } = useIsLoading();
  const { datas, setDatas } = useFormAnalysis(
    {
      name: gardenData.garden.name,
      description: gardenData.garden.description,
      area: gardenData.garden.area,
      garden_type_id: "",
      climate_id: "",
      location_id: "",
      picture_opacity: gardenData.garden.picture_opacity,
    },
    {
      isEmpty: "Ce champ est obligatoire",
    }
  );

  const handleUpdate = async () => {

    const data = {
        garden: {
          garden_type_id: datas.garden_type_id,
          name: datas.name,
          area: parseInt(datas.area),
          description : datas.description,
          climate_id: datas.climate_id,
          location_id: datas.location_id,
          picture_opacity: datas.picture_opacity
        },
      };

    const updatedGarden = await updateGarden(garden_id, data, getJwtToken);
    updateGardenData(updatedGarden)
    setIsAmmendable(false);
    
  };

  const handleOpacityValue = (value) => {
    setOpacityValue(1 - value / 100);
    setDatas({ ...datas, picture_opacity: 1 - value / 100 })
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
    <>
      <Input
        id={"name"}
        name={"name"}
        type={"text"}
        placeHolder={"Un ptit nom sympa pour votre jardin ?"}
        classNames={["w-full my-2"]}
        value={datas?.garden?.name}
        onInput={(obj) => setDatas({ ...datas, name: obj.value })}
      />

      <Input
        id={"area"}
        name={"area"}
        type={"number"}
        placeHolder={"Quelle est la surface de votre jardin ?"}
        classNames={["w-full my-2"]}
        value={datas?.garden?.area}
        onInput={(obj) => setDatas({ ...datas, area: obj.value })}
      />

      <TextArea
        id="description"
        name="description"
        classNames={["w-full my-2"]}
        value={datas.description}
        onInput={(obj) => setDatas({ ...datas, description: obj.value })}
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
          setDatas({ ...datas, garden_type_id: garden_type_id })
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
          setDatas({ ...datas, climate_id: climate_id })
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
          setDatas({ ...datas, location_id: location_id })
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
          "w-full",
          "col-span-4",
          "lg:col-span-2",
          "my-4",
        ]}
        onclick={() => handleUpdate(garden_id)}
      />
    </>
  );
};

export default GardenEditionForm;