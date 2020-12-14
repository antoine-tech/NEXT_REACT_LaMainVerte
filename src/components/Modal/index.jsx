import React from "react";
import FormGroup from "../FormGroup/index";
import useFormAnalysis from '../../hooks/useFormAnalysis';
import LetsGoButton from '../buttons/LetsGoButton/index';

const Modal = () => {
  const { eventData, alerts, handleInput, handleBlur } = useFormAnalysis();

  const handleSubmit = () => {};

  return (
    <form
      action=""
      className="grid grid-cols-2 gap-4 my-2"
      onSubmit={handleSubmit}
    >
      <FormGroup
        colSpan="2"
        onInput={(value) => handleInput(value)}
        onBlur={(value) => handleBlur(value)}
        value={eventData.password}
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
        value={eventData.description}
        name="description"
        id="description"
        type="text"
        labelText="Description :"
        alertMessage={alerts.description}
      />

      <LetsGoButton backgroundColor="bg-green" text="C'EST PARTI" />
    </form>
  );
};

export default Modal;
