import type { ReactNode } from "react";
import type React from "react";
import { BrowserRouter } from "react-router-dom";
import SessionProvider from "./contexts/sessionContext";
import SelectedSessionProvider from "./contexts/selectedSessionContext";

const Providers: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <BrowserRouter>
      <SessionProvider>
        <SelectedSessionProvider>{children}</SelectedSessionProvider>
      </SessionProvider>
    </BrowserRouter>
  );
};
export default Providers;
