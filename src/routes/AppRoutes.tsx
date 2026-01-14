import { Route, Routes } from 'react-router';
import { APP_ROUTES } from '../constants/routes';
import Landing from '../pages/landing/Landing';
import SignIn from '../pages/auth/SignIn';
import PollsList from '../pages/poll/list';
import CreatePoll from '../pages/poll/add';
import PollLink from '../pages/poll/link/PollLink';
import NotFoundPage from '../pages/not-found/NotFoundPage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path={APP_ROUTES.SIGN_IN} element={<SignIn />} />
      <Route path={APP_ROUTES.POLLS} element={<PollsList />} />
      <Route path={APP_ROUTES.LANDING} element={<Landing />} />
      <Route path={APP_ROUTES.ADD_POLL} element={<CreatePoll />} />
      <Route path={APP_ROUTES.EDIT_POLL.PATH} element={<CreatePoll />} />
      <Route path={APP_ROUTES.POLL_LINK.PATH} element={<PollLink />} />
      {/* <Route path="/pollDetails/:pollLink" element={<PollDetailsPage />} /> */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;
