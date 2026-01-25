import { BasicAlert } from './components/BasicAlert/BasicAlert';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import MainLayout from './layouts/MainLayout';
import { useAxiosInterceptors } from './network/axios';
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
