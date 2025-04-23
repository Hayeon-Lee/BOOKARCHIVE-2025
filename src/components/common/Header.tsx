import { Button, Typography } from 'antd';
import { useUserStore } from '../../services/auth/useUsrStoreService';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

const Header = () => {
  const loginUser = useUserStore((state) => state.loginUser);
  const clearUser = useUserStore((state) => state.clearUser);
  const navigate = useNavigate();

  const handleLogout = () => {
    clearUser();
    navigate('/');
  };

  return (
    <div
      style={{
        padding: 16,
        background: '#577aaf',
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <Title
        level={2}
        onClick={() => navigate('/bookarchive')}
        style={{ cursor: 'pointer' }}
      >
        📚 BOOKARCHIVE-2025
      </Title>
      {loginUser ? (
        <div>
          <span style={{ marginRight: 12 }}>{loginUser.nickname}님</span>
          <Button danger onClick={handleLogout}>
            로그아웃
          </Button>
        </div>
      ) : null}
    </div>
  );
};

export default Header;
