import { Button } from 'antd';
import { useUserStore } from '../../services/auth/useUsrStoreService';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const loginUser = useUserStore((state) => state.loginUser);
  const clearUser = useUserStore((state) => state.clearUser);
  const navigate = useNavigate();

  const handleLogout = () => {
    clearUser();
    navigate('/');
  };

  if (!loginUser) return null;

  return (
    <div
      style={{
        padding: 16,
        background: '#577aaf',
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <div>📚 BOOKARCHIVE-2025</div>
      <div>
        <span style={{ marginRight: 12 }}>{loginUser.nickname}님</span>
        <Button danger onClick={handleLogout}>
          로그아웃
        </Button>
      </div>
    </div>
  );
};

export default Header;
