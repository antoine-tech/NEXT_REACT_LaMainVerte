import React from "react";
import useFormAnalysis from "../../../hooks/useFormAnalysis";
import LetsGoButton from "../../buttons/LetsGoButton/index";
import FormGroup from "../../FormGroup/index";
import Input from "../../Input/index";

const EventCreationForm = ({id, onClick}) => {
  const { datas, alerts, handleInput, handleBlur } = useFormAnalysis(
    {
      title: "",
      description: "",
    },
    {
      isEmpty: "Ce champ est obligatoire",
    }
  );

  const handleSubmit = () => {};
  return (
    <div className="grid grid-cols-12 flex items-center" id={id} onClick={()=>onClick()}>
      <form
        action=""
        className="grid grid-cols-2 col-span-12 md:col-span-6 md:col-start-4 gap-4 my-2"
        onSubmit={handleSubmit}
        style={{ height: "max-content" }}
      >
        <h2 className="my-4">Ajouter un évenement</h2>

        <p style={{ fontSize: "1rem" }} className="col-span-2">
          Date de l'évènement :
        </p>
        <Input classNames={["col-span-2"]} type="date" name="date" id="date" />
        <FormGroup
          colSpan="2"
          onInput={(value) => handleInput(value)}
          onBlur={(value) => handleBlur(value)}
          value={datas.title}
          name="title"
          id="title"
          type="text"
          labelText="Titre :"
          alertMessage={alerts.title}
        />
        <FormGroup
          colSpan="2"
          onInput={(value) => handleInput(value)}
          onBlur={(value) => handleBlur(value)}
          value={datas.description}
          name="description"
          id="description"
          type="text"
          labelText="Description :"
          alertMessage={alerts.description}
        />

        <LetsGoButton backgroundColor="bg-green" text="C'EST PARTI" />
      </form>
    </div>
  );
};

export default EventCreationForm;
