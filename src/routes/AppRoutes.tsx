import { Route, Routes } from 'react-router';
import ProtectedRoute from '../components/ProtectedRoute/ProtectedRoute';
import { APP_ROUTES } from '../constants/routes';
import SignIn from '../pages/auth/SignIn';
import Landing from '../pages/landing/Landing';
import NotFoundPage from '../pages/not-found/NotFoundPage';
import CreatePoll from '../pages/poll/add';
import PollLink from '../pages/poll/link/PollLink';
import PollsList from '../pages/poll/list';
import PollView from '../pages/poll/view';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path={APP_ROUTES.SIGN_IN} element={<SignIn />} />
      <Route path={APP_ROUTES.LANDING} element={<Landing />} />
      <Route path={APP_ROUTES.POLL_LINK.PATH} element={<PollLink />} />
      <Route path={APP_ROUTES.POLL_VIEW.PATH} element={<PollView />} />
      <Route element={<ProtectedRoute />}>
        <Route path={APP_ROUTES.POLLS} element={<PollsList />} />
        <Route path={APP_ROUTES.ADD_POLL} element={<CreatePoll />} />
        <Route path={APP_ROUTES.EDIT_POLL.PATH} element={<CreatePoll />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;
