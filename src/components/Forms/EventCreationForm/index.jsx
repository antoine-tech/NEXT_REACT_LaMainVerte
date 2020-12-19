import React from "react";
import { useParams } from "react-router-dom";
import { createEvent } from "../../../requests/events";
import useFormAnalysis from "../../../hooks/useFormAnalysis";
import useJwtToken from "../../../hooks/useJwtToken";
import Moment from "react-moment";
import FormGroup from '../../base_components/FormGroup/index';
import LetsGoButton from '../../base_components/buttons/LetsGoButton/index';


const EventCreationForm = ({
  id,
  data,
  onClick,
  events,
  setEvents,
  setModalOpen,
}) => {
  const { garden_id } = useParams();
  const { getJwtToken } = useJwtToken();
  const { datas, alerts, handleInput, handleBlur } = useFormAnalysis(
    {
      name: "",
      description: "",
      start_date: data?.start,
      end_date: data?.end,
    },
    {
      isEmpty: "Ce champ est obligatoire",
    }
  );

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const newEvent = await createEvent(
        garden_id,
        {
          event: {
            name: datas.name,
            description: datas.description,
            start_date: datas.start_date,
            end_date: datas.end_date,
          },
        },
        getJwtToken
      );
      setEvents(newEvent);
      setModalOpen(false);
    } catch (error) {}
  };

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
            Evenement du
            <Moment className="italic" format=" DD/MM/YYYY ">
              {datas.start_date}
            </Moment>
            au
            <Moment className="italic" format=" DD/MM/YYYY ">
              {datas.end_date}
            </Moment>
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
        />
        <FormGroup
          colSpan="2"
          onInput={(value) => handleInput(value)}
          onBlur={(value) => handleBlur(value)}
          value={datas.name}
          name="name"
          id="name"
          type="name"
          labelText="Nom :"
          alertMessage={alerts.name}
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