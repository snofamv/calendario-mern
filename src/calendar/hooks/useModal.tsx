import { useContext } from "react";
import { ModalContext } from "../context/ModalContext";
export const useModal = () => {
  const {
    showModal,
    hideModal,
    setEvent,
    isActive,
    selectedEvent,
    newEvent,
    setNewEvent,
  } = useContext(ModalContext);

  return {
    showModal,
    hideModal,
    setEvent,
    setNewEvent,
    isActive,
    selectedEvent,
    newEvent,
  };
};
