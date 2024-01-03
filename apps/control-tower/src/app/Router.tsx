import { Route, Routes } from 'react-router-dom';

import App from './app';
import SignUp from './SignUp';
import PilotPage from './PilotPage';
import Login from './Login';

const Router = () => {
  return (
    <Routes>
        <Route path={'/'} element={<App />} />
        <Route path={'/signup'} element={<SignUp />} />
        <Route path={'/login'} element={<Login />} />
        <Route path={'/pilot/:email'} element={<PilotPage />} />
    </Routes>
  );
};

export default Router;
