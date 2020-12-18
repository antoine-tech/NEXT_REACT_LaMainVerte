import { Moment } from "react-moment";

const EventDisplay = ({ id, data, onClick, setModalOpen, setEventDisplayed }) => {

  const handleClose = () =>
  {
    setEventDisplayed(false);
    setModalOpen(false)
  }
  return (
    <div
      className="w-full grid grid-cols-7 flex justify-center items-center"
      id={id}
      onClick={(event) => onClick(event)}
    >
      <div className="col-span-7 lg:col-span-3 lg:col-start-3 flex flex-col justify-around p-4 bg-white border-blue-dark radius" >
        <h2 className="my-2">Titre de l'évènement :</h2>
        <h3>{data.title}</h3>

        <h3 className="my-2">Description: </h3>

        <h4>{data.ressource}</h4>

        <button className="btn btn-lg text-white bg-blue-dark w-full my-4" onClick={handleClose}>FERMER</button>
      </div>

    </div>
  );
};

export default EventDisplay;
