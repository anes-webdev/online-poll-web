import { BasicAlert } from './components/BasicAlert/BasicAlert';
import MainLayout from './layouts/MainLayout';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <>
      <MainLayout>
        <AppRoutes />
      </MainLayout>
      <BasicAlert />
    </>
  );
}

export default App;
