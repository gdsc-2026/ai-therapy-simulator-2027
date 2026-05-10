import { Route, Routes } from "react-router-dom";
import Game from "./Game.tsx";
import NotFound from "./not-found.tsx";

/**
 * Defines all routes within the app
 */
const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Game />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
export default AppRoutes;
