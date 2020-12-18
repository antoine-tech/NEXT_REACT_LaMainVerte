import Moment from "react-moment";
import { deleteEvent } from "../../requests/events";
import useJwtToken from "../../hooks/useJwtToken";

const EventDisplay = ({
  id,
  data,
  onClick,
  setModalOpen,
  setEventDisplayed,
  removeEvent,
}) => {
  const { getJwtToken } = useJwtToken();

  const handleDeleteEvent = async () => {
    const response = await deleteEvent(data.ressource.event.id, getJwtToken);
    removeEvent(data.ressource.event.id);
    handleClose();
  };
  const handleClose = () => {
    setEventDisplayed(false);
    setModalOpen(false);
  };
  return (
    <div
      className="w-full grid grid-cols-7 flex justify-center items-center"
      id={id}
      onClick={(event) => onClick(event)}
    >
      <div className="grid grid-cols-2 gap-4 col-span-7 lg:col-span-3 lg:col-start-3 flex flex-col justify-around p-4 bg-white border-blue-dark radius">
        <h3 className="italic col-span-2">
          Du <Moment format="DD/MM/YYYY">{data.start}</Moment> au{" "}
          <Moment format="DD/MM/YYYY">{data.end}</Moment>
        </h3>
        <h4 className="my-2 col-span-2">Titre: </h4>

        <h2>{data.title}</h2>

        <h4 className="my-2 col-span-2">Description: </h4>

        <h4 className="col-span-2">{data.ressource.event.description}</h4>

        <button
          className="col-span-1 btn btn-lg text-white bg-blue-dark"
          onClick={handleClose}
        >
          FERMER
        </button>

        <button
          className="col-span-1 btn btn-lg text-white bg-red"
          onClick={handleDeleteEvent}
        >
          SUPPRIMER
        </button>
      </div>
    </div>
  );
};

export default EventDisplay;
