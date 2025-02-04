import { AppLayout } from "../layout/AppLayout";
import { localizer, getMessagesES } from "../helpers";
import { Calendar, View } from "react-big-calendar";
import { CalendarEventBox } from "../components";
import { useEffect, useState } from "react";
import { CalendarModal, Event } from "../components/modal/CalendarModal";
import { useModal } from "../hooks/useModal";
import { Button } from "../components/ui/Button";
import { useApi } from "../hooks/useApi";
import Swal from "sweetalert2";

export const CalendarPage = () => {
  const [lastView] = useState(localStorage.getItem("lastView") || "agenda");
  const [eventos, setEventos] = useState<Event[]>([]);
  const { showModal, setEvent } = useModal();
  const { fetchQuery } = useApi<Event | any, any>(
    "http://localhost:3001/api/calendar",
    "events"
  );

  const eventStyleGetter = () => ({
    style: {
      backgroundColor: "#347CF7",
      borderRadius: "0px",
      opacity: 0.8,
      color: "white",
    },
  });

  const onDoubleCLick = (event: Event) => {
    console.log({ doubleClick: event });
  };

  const onSelect = (event: Event) => {
    setEvent(event, "update");
    showModal();
    console.log(event);
  };

  const onViewChange = (view: View) => {
    localStorage.setItem("lastView", view);
  };

  useEffect(() => {
    if (fetchQuery.data) {
      const eventosConvertidos = fetchQuery.data.eventos.map(
        (evento: Event) => ({
          ...evento,
          start: new Date(evento.start), // Convertir a Date
          end: new Date(evento.end),
        })
      );

      setEventos(eventosConvertidos);
    }
  }, [fetchQuery.data]);
  useEffect(() => {
    if (!fetchQuery.isLoading && !fetchQuery.error) {
      Swal.close();
    }
    if (fetchQuery.isLoading) {
      Swal.fire({
        title: "Cargando...",
        text: "Por favor, espere mientras se cargan los datos.",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
    }

    if (fetchQuery.error) {
      Swal.fire({
        title: "Error",
        text: "Hubo un problema al cargar los eventos.",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    }
  }, [fetchQuery.isLoading, fetchQuery.error]);

  return (
    <AppLayout>
      <>
        <h1>Calendar page</h1>

        {!fetchQuery.isLoading && !fetchQuery.error && fetchQuery.data && (
          <Calendar
            culture="es"
            defaultView={lastView as View}
            localizer={localizer}
            events={eventos}
            startAccessor="start"
            endAccessor="end"
            style={{ height: "calc( 100vh - 80px )" }}
            messages={getMessagesES()}
            eventPropGetter={eventStyleGetter}
            components={{
              event: CalendarEventBox,
            }}
            onDoubleClickEvent={onDoubleCLick}
            onSelectEvent={onSelect}
            onView={onViewChange}
          />
        )}

        <CalendarModal />
        <Button />
      </>
    </AppLayout>
  );
};
