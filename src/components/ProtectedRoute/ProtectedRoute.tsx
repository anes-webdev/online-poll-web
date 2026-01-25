import { Navigate, Outlet } from 'react-router';
import { APP_ROUTES } from '../../constants/routes';
import { useAuth } from '../../hooks/useAuth';

const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to={APP_ROUTES.SIGN_IN} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
