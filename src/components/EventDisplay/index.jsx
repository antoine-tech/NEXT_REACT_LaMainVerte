import { Moment } from "react-moment";

const EventDisplay = ({ id, data, onClick, setModalOpen }) => {
  return (
    <div
      className="w-full grid grid-cols-7 flex justify-center items-center"
      id={id}
      onClick={(event) => onClick(event)}
    >
      <div className="shadow-neomorph-1 p-4 col-span-3 col-start-3 flex flex-col justify-around" style={{height:'50vh'}}>
        <h2 className="my-2">Titre de l'évènement :</h2>
        <h3>{data.title}</h3>

        <h3 className="my-2">Description: </h3>

        <h4>{data.ressource}</h4>

        <button className="btn btn-lg text-white bg-red w-full my-4">VALIDER</button>
      </div>

    </div>
  );
};

export default EventDisplay;
