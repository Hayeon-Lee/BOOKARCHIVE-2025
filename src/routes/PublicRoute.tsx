import { Navigate, Outlet } from 'react-router-dom';
import { useUserStore } from '../services/auth/useUsrStoreService';

const PublicRoute = () => {
  const loginUser = useUserStore((state) => state.loginUser);
  return loginUser ? <Navigate to="/bookarchive" replace /> : <Outlet />;
};

export default PublicRoute;
