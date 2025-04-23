import { Navigate, Outlet } from 'react-router-dom';
import { useUserStore } from '../services/auth/useUsrStoreService';

const ProtectedRoute = () => {
  const loginUser = useUserStore((state) => state.loginUser);
  return loginUser ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;
