import { createContext } from "react";
interface ModalContextProps {
  hideModal: () => void;
  showModal: () => void; // Función para actualizar el estado.
  setEvent: (event: any, typeForm: string) => void; // Función para actualizar el estado.
  setNewEvent: (event: any) => void; // Función para actualizar el estado.
  isActive: boolean; // Función para actualizar el estado.
  selectedEvent: any; // Función para actualizar el estado.
  newEvent: any; // Función para actualizar el estado.
}

export const ModalContext = createContext({} as ModalContextProps);
