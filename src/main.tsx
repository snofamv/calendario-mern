import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import CalendarApp from "./CalendarApp.tsx";
import { AuthProvider } from "./auth/context/AuthProvider.tsx";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <CalendarApp />
    </AuthProvider>
  </StrictMode>
);
