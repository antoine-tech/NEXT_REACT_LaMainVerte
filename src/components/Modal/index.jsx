import React from "react";
import ReactDOM from "react-dom";

const Modal = ({ id, setModalOpen, parentNodeId, component: Component }) => {
  return ReactDOM.createPortal(
    <Component
      id={id}
      onClick={() => {
        setModalOpen(false);
      }}
    />,
    document.getElementById(parentNodeId)
  );
};

export default Modal;
