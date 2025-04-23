import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../../services/auth/useUsrStoreService';
import { Form, Input, Typography, message } from 'antd';

import { loginUser } from '../../services/auth/authService';
import AuthButton from './AuthButton';

const { Text } = Typography;

const LoginForm = () => {
  const [error, setError] = useState<string>('');
  const [, setSuccess] = useState<boolean>(false);

  const navigate = useNavigate();
  const { setUser } = useUserStore();

  const handleLogin = async (values: {
    nickname: string;
    password: string;
  }) => {
    setError('');
    setSuccess(false);

    try {
      const userData = await loginUser(values.nickname, values.password);
      setUser({
        userId: userData.userId,
        nickname: userData.nickname,
      });

      setSuccess(true);
      message.success('로그인 성공!');
      navigate('/bookarchive');
    } catch (err) {
      message.error((err as Error).message);
    }
  };

  const handleChangePassword = () => {
    navigate('/changepassword');
  };

  return (
    <Form
      layout="vertical"
      onFinish={handleLogin}
      style={{ maxWidth: 400, margin: '0 auto' }}
    >
      <Form.Item
        label="오픈 채팅방 닉네임"
        name="nickname"
        rules={[{ required: true, message: '닉네임을 입력해주세요.' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="비밀번호"
        name="password"
        rules={[{ required: true, message: '비밀번호를 입력해주세요.' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item>
        <AuthButton htmlType="submit" label="로그인" />
        <AuthButton onClick={handleChangePassword} label="비밀번호 변경" />
      </Form.Item>

      {error && <Text type="danger">{error}</Text>}
    </Form>
  );
};

export default LoginForm;
