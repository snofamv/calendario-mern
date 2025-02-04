import { addHours } from "date-fns";
import { useModal } from "../../hooks/useModal";
import styles from "./styles.module.css";

export const Button = () => {
  const { showModal, setEvent } = useModal();
  const handleAddEvent = () => {
    setEvent(
      {
        title: "",
        notes: "",
        start: new Date(),
        end: addHours(new Date(), 2),
        bgColor: "",
        user: {
          _id: "",
          name: "",
        },
      },
      "add"
    );
    showModal();
  };

  return (
    <button onClick={handleAddEvent} className={styles.button}>
      +
    </button>
  );
};
