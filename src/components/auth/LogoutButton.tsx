import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../../services/auth/useUsrStoreService';
import { Button } from 'antd';

const LogoutButton = () => {
  const clearUser = useUserStore((state) => state.clearUser);
  const navigate = useNavigate();

  const handleLogout = () => {
    clearUser();
    navigate('/');
  };

  return (
    <Button danger onClick={handleLogout}>
      로그아웃
    </Button>
  );
};

export default LogoutButton;
