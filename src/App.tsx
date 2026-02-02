import { useAxiosInterceptors } from './api/client/interceptors';
import { BasicAlert } from './components/BasicAlert/BasicAlert';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import MainLayout from './layouts/MainLayout';
import AppRoutes from './routes/AppRoutes';

function App() {
  useAxiosInterceptors();
  return (
    <ErrorBoundary>
      <MainLayout>
        <AppRoutes />
      </MainLayout>
      <BasicAlert />
    </ErrorBoundary>
  );
}

export default App;
