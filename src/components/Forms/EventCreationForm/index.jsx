import React from "react";
import useFormAnalysis from "../../../hooks/useFormAnalysis";
import LetsGoButton from "../../buttons/LetsGoButton/index";
import FormGroup from "../../FormGroup/index";
import Moment from "react-moment";

const EventCreationForm = ({ id, data, onClick }) => {
  const { datas, alerts, handleInput, handleBlur } = useFormAnalysis(
    {
      title: "",
      description: "",
      start_date: data?.start,
      end_date: data?.end,
    },
    {
      isEmpty: "Ce champ est obligatoire",
    }
  );

  const handleSubmit = () => {};
  return (
    <div
      className="grid grid-cols-12 flex items-center"
      id={id}
      onClick={(event) => onClick(event)}
    >
      <form
        action=""
        className="grid grid-cols-2 col-span-12 md:col-span-6 md:col-start-4 gap-4 my-2"
        onSubmit={handleSubmit}
        style={{ height: "max-content" }}
      >
        <div className="my-4 col-span-2 flex">
          <h2>
            Créer un évenement du
            <Moment format="DD/MM/YYYY">{Date.parse(data.start)}</Moment>
            au
            <Moment format="DD/MM/YYYY">{Date.parse(data.end)}</Moment>
          </h2>
        </div>

        <FormGroup
          colSpan="2 lg:col-span-1"
          onInput={(value) => handleInput(value)}
          onBlur={(value) => handleBlur(value)}
          value={datas.start_date}
          name="start_date"
          id="start_date"
          type="date"
          labelText="Début"
          alertMessage={alerts.start_date}
        />

        <FormGroup
          colSpan="2 lg:col-span-1"
          onInput={(value) => handleInput(value)}
          onBlur={(value) => handleBlur(value)}
          value={datas.end_date}
          name="end_date"
          id="end_date"
          type="date"
          labelText="Fin"
          alertMessage={alerts.end_date}
        />
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
