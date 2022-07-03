import React from "react";
import { FaTimes } from "react-icons/fa";
import { useGlobalContext } from "./context";
const Modal = () => {
  const { isModalOpen, closeModal } = useGlobalContext(); // adding the modal open state and the close modal functionality to the consumer component
  return (
    <div
      className={`${
        isModalOpen ? "modal-overlay show-modal" : "modal-overlay"
      }`} // checking the modal open state to define the class name
    >
      <div className="modal-container">
        <h3>Modal Content Here</h3>
        <button
          className="close-modal-btn"
          onClick={closeModal} // adding the click event to close modal
        >
          <FaTimes />
        </button>
      </div>
    </div>
  );
};

export default Modal;
