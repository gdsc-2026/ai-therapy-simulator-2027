import { Route, Routes } from "react-router-dom";
import Game from "./Game.tsx";

/**
 * Defines all routes within the app
 */
const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="*" element={<Game />} />
    </Routes>
  );
};
export default AppRoutes;
