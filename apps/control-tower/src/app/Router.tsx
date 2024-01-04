import { Route, Routes } from 'react-router-dom';

import App from './pages/home/app';
import SignUp from './pages/sign-up/SignUp';
import PilotPage from './pages/pilot/PilotPage';
import Login from './pages/log-in/Login';

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
