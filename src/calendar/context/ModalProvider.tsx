import { useState } from "react";
import { ModalContext } from "./ModalContext";
import { addHours } from "date-fns";
import { Event } from "../components/modal/CalendarModal";
const initialEventSelected: Event = {
  _id: "",
  title: "",
  notes: "",
  start: new Date(),
  end: addHours(new Date(), 2),
  bgColor: "",
  user: {
    _id: "",
    name: "",
  },
  type: "add",
};
export const ModalProvider = ({ children }: any) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] =
    useState<Event>(initialEventSelected);
  const [newEvent, setNewEvent] = useState<Event>(initialEventSelected);
  const handleShowModal = () => setShowModal(true);
  const handleHideModal = () => setShowModal(false);
  const handleSaveEvent = (event: Event, typeOf: string) => {
    setSelectedEvent({ ...event, type: typeOf });
  };
  const handleSaveNewEvent = (event: Event) => {
    setNewEvent(event);
  };
  return (
    <ModalContext.Provider
      value={{
        hideModal: handleHideModal,
        showModal: handleShowModal,
        setEvent: handleSaveEvent,
        setNewEvent: handleSaveNewEvent,
        isActive: showModal,
        selectedEvent,
        newEvent,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
