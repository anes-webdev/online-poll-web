import { Route, Routes } from "react-router";
import { APP_ROUTES } from "../constants/routes";
import Landing from "../pages/landing/Landing";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path={APP_ROUTES.LANDING} element={<Landing />} />
      {/* <Route path="/signIn" element={<SignInPage />} />
          <Route path="/pollList" element={<PollListPage />} />
          <Route path="/createPoll" element={<CreatePollPage />} />
          <Route path="/editPoll/:pollLink" element={<EditPollPage />} />
          <Route path="/pollLink/:pollLink" element={<PollLingPage />} />
          <Route path="/pollDetails/:pollLink" element={<PollDetailsPage />} /> */}
      {/* <Route path="*" element={<NotFoundPage />} /> */}
    </Routes>
  );
};

export default AppRoutes;
