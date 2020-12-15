import React from "react";
import ReactDOM from "react-dom";

const Modal = ({ id, data, setModalOpen, parentNodeId, component: Component }) => {
  return ReactDOM.createPortal(
    <Component
      id={id}
      data={data}
      onClick={(event) => {
        event.target.id === id && setModalOpen(false);
      }}
    />,
    document.getElementById(parentNodeId)
  );
};

export default Modal;
