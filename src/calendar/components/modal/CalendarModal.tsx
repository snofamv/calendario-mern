import { useEffect, useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import Modal from "react-modal";
import "react-datepicker/dist/react-datepicker.css";
import { es } from "date-fns/locale/es";
import Swal from "sweetalert2";
import { z } from "zod";
import { useModal } from "../../hooks/useModal";
import { useAuth } from "../../../auth/hooks";
import { useApi } from "../../hooks/useApi";

registerLocale("es", es);

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

const eventSchema = z.object({
  title: z.string().min(1, "El título es obligatorio"), // Campo obligatorio con longitud mínima
  notes: z.string().min(3, "La descripcion de la nota es obligatoria"), // Campo opcional
  start: z.date({
    required_error: "La fecha de inicio es obligatoria",
    invalid_type_error: "La fecha de inicio debe ser válida",
  }),
  end: z.date({
    required_error: "La fecha de fin es obligatoria",
    invalid_type_error: "La fecha de fin debe ser válida",
  }),
});
export interface Event {
  _id: string;
  bgColor?: string;
  end: Date;
  start: Date;
  notes: string;
  title: string;
  user: {
    _id: string;
    name: string;
  };
  type?: string;
}
export const CalendarModal = () => {
  const { createEvent, updateEvent } = useApi<Event, any>(
    "http://localhost:3001/api/calendar",
    "eventos",
    false
  );
  const { user } = useAuth();
  const { isActive, hideModal, selectedEvent } = useModal();
  const [formValues, setFormValues] = useState<Event>(
    selectedEvent || ({} as Event)
  );
  const onInputChange = ({ target }: any) => {
    setFormValues({ ...formValues, [target.name]: target.value });
  };

  const onDateChange = (event: any, changing: string) => {
    setFormValues({ ...formValues, [changing]: event });
  };

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const validationResult = eventSchema.safeParse(formValues);
    if (!validationResult.success) {
      Swal.fire("Error", "Revisa los campos del formulario", "error");
      return;
    }

    const newEvent = {
      ...formValues,
      user: { _id: user._id!, name: user.name! },
    };
    const isUpdatingEvent = newEvent.type?.toUpperCase() === "UPDATE";
    const mutation = isUpdatingEvent ? updateEvent : createEvent;
    Swal.fire({
      title: "Procesando...",
      text: isUpdatingEvent ? "Actualizando evento..." : "Agendando evento...",
      allowOutsideClick: false,
      allowEscapeKey: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
    setTimeout(() => {
      mutation.mutate(newEvent, {
        onSuccess: () => {
          Swal.fire({
            title: isUpdatingEvent ? "Evento actualizado" : "Evento creado",
            text: "Operación exitosa",
            icon: "success",
            allowOutsideClick: false,
            allowEscapeKey: false,
          });
          hideModal();
        },
        onError: (error: any) => {
          console.error(error.response.data.msg);
          Swal.fire("Error", error.response.data.msg, "error");
        },
      });
    }, 1500);
  };

  useEffect(() => {
    if (selectedEvent) {
      setFormValues(selectedEvent);
    }
  }, [selectedEvent]);

  return (
    <div>
      <Modal
        isOpen={isActive}
        onRequestClose={hideModal}
        style={customStyles}
        className={"modal"}
        overlayClassName={"modal-fondo"}
        closeTimeoutMS={200}
      >
        <h1> Nuevo evento </h1>
        {createEvent.isPending && <p>Guardando evento...</p>}
        {createEvent.isError && <p>Error al guardar evento...</p>}
        {updateEvent.isPending && <p>Actualizando evento...</p>}
        {updateEvent.isError && <p>Error al actualizando evento...</p>}
        <hr />
        <form className="container" onSubmit={onSubmit}>
          <div className="form-group mb-2">
            <label>Fecha y hora inicio</label>
            <DatePicker
              showTimeSelect
              className="form-control"
              selected={formValues.start as any}
              onChange={(event) => onDateChange(event, "start")}
              locale={"es"}
              timeCaption="Hora"
            />
          </div>

          <div className="form-group mb-2">
            <label>Fecha y hora fin</label>
            <DatePicker
              showTimeSelect
              minDate={formValues.start as any}
              className="form-control"
              selected={formValues.end as any}
              onChange={(event) => onDateChange(event, "end")}
              locale={"es"}
              timeCaption="Hora"
            />
          </div>

          <hr />
          <div className="form-group mb-2">
            <label>Titulo y notas</label>
            <input
              type="text"
              className="form-control"
              placeholder="Título del evento"
              name="title"
              autoComplete="off"
              value={formValues.title}
              onChange={onInputChange}
            />
            <small id="emailHelp" className="form-text text-muted">
              Una descripción corta
            </small>
          </div>

          <div className="form-group mb-2">
            <textarea
              className="form-control"
              placeholder="Notas"
              rows={5}
              name="notes"
              value={formValues.notes}
              onChange={onInputChange}
            ></textarea>
            <small id="emailHelp" className="form-text text-muted">
              Información adicional
            </small>
          </div>

          <button
            type="submit"
            className="btn btn-outline-primary btn-block"
            disabled={createEvent.isPending || updateEvent.isPending}
          >
            {createEvent.isPending || updateEvent.isPending ? (
              <span>
                <i className="fas fa-spinner fa-spin"></i> Guardando...
              </span>
            ) : (
              <span>
                <i className="far fa-save"></i> Guardar
              </span>
            )}
          </button>
        </form>
      </Modal>
    </div>
  );
};
