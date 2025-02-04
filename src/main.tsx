import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import CalendarApp from "./CalendarApp.tsx";
import { AuthProvider } from "./auth/context/AuthProvider.tsx";
import "./index.css";
import { ModalProvider } from "./calendar/context/ModalProvider.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ModalProvider>
          <CalendarApp />
        </ModalProvider>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
