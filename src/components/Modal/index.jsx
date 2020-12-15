import React from "react";
import ReactDOM from "react-dom";

const Modal = ({
  id,
  data,
  events,
  setEvents,
  setModalOpen,
  parentNodeId,
  component: Component,
}) => {
  return ReactDOM.createPortal(
    <Component
      id={id}
      data={data}
      event={events}
      setEvents={(value)=>setEvents(value)}
      setModalOpen={setModalOpen}
      onClick={(event) => {
        event.target.id === id && setModalOpen(false);
      }}
    />,
    document.getElementById(parentNodeId)
  );
};

export default Modal;
