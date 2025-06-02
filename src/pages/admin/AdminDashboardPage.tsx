import type { MenuProps } from 'antd';
import { Layout, Menu } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Outlet, useNavigate } from 'react-router-dom';

const { Sider, Content } = Layout;

const AdminDashboardPage = () => {
  const navigate = useNavigate();

  const menuItems = [
    {
      key: 'reading-status',
      icon: <UserOutlined />,
      label: '이번 달 독서 현황',
    },
    {
      key: 'password-requests',
      icon: <LockOutlined />,
      label: '비밀번호 변경 요청',
    },
  ];

  const handleClick: MenuProps['onClick'] = ({ key }) => {
    navigate(`/admin/${key}`);
  };

  return (
    <Layout>
      <Sider collapsible>
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={['reading-status']}
          items={menuItems}
          onClick={handleClick}
        />
      </Sider>

      <Layout>
        <Content>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminDashboardPage;
