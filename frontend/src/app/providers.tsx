import type { ReactNode } from "react";
import type React from "react";
import { BrowserRouter } from "react-router-dom";

const Providers: React.FC<{ children: ReactNode }> = ({ children }) => {
  return <BrowserRouter>{children}</BrowserRouter>;
};
export default Providers;
