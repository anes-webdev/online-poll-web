import { Route, Routes } from 'react-router';
import ProtectedRoute from '../components/ProtectedRoute/ProtectedRoute';
import { APP_ROUTES } from '../constants/routes';
import { TestComponent } from '../pages/test/TestComponent';
import { lazy, Suspense } from 'react';
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner';

const SignIn = lazy(() => import('../pages/auth/SignIn'));
const Landing = lazy(() => import('../pages/landing/Landing'));
const PollLink = lazy(() => import('../pages/poll/link/PollLink'));
const PollView = lazy(() => import('../pages/poll/view'));
const PollsList = lazy(() => import('../pages/poll/list'));
const CreatePoll = lazy(() => import('../pages/poll/add'));
const NotFoundPage = lazy(() => import('../pages/not-found/NotFoundPage'));
// Todo: remove test component:
const AppRoutes = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path={APP_ROUTES.SIGN_IN} element={<SignIn />} />
        <Route path={APP_ROUTES.LANDING} element={<Landing />} />
        <Route path={APP_ROUTES.POLL_LINK.PATH} element={<PollLink />} />
        <Route path={APP_ROUTES.POLL_VIEW.PATH} element={<PollView />} />
        <Route path={'test'} element={<TestComponent />} />
        <Route element={<ProtectedRoute />}>
          <Route path={APP_ROUTES.POLLS} element={<PollsList />} />
          <Route path={APP_ROUTES.ADD_POLL} element={<CreatePoll />} />
          <Route path={APP_ROUTES.EDIT_POLL.PATH} element={<CreatePoll />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
