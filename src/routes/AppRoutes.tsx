import { Route, Routes } from 'react-router';
import { APP_ROUTES } from '../constants/routes';
import Landing from '../pages/landing/Landing';
import SignIn from '../pages/auth/SignIn';
import PollsList from '../pages/poll/polls-list';
import CreatePoll from '../pages/poll/add';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path={APP_ROUTES.LANDING} element={<Landing />} />
      <Route path={APP_ROUTES.SIGN_IN} element={<SignIn />} />
      <Route path={APP_ROUTES.POLLS} element={<PollsList />} />
      <Route path={APP_ROUTES.ADD_POLL} element={<CreatePoll />} />
      {/* <Route path="/editPoll/:pollLink" element={<EditPollPage />} /> */}
      {/* <Route path="/pollLink/:pollLink" element={<PollLingPage />} /> */}
      {/* <Route path="/pollDetails/:pollLink" element={<PollDetailsPage />} /> */}
      {/* <Route path="*" element={<NotFoundPage />} /> */}
    </Routes>
  );
};

export default AppRoutes;
