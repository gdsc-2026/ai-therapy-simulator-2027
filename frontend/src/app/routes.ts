import { Route, Routes } from 'react-router-dom';
import NotFound from './not-found';


/**
 * Defines all routes within the app
 */
const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path='/*' element={<NotFound />} />
    </Routes>
  );
};
export default AppRoutes;