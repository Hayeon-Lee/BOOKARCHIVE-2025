import { Navigate, Outlet } from 'react-router-dom';
import { useUserStore } from '../services/auth/useUsrStoreService';

const AdminRoute = () => {
  const loginUser = useUserStore((state) => state.loginUser);

  if (loginUser && loginUser.nickname === '포포') {
    return <Outlet />;
  }

  return <Navigate to="/" replace />;
};

export default AdminRoute;
