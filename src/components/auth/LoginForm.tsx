import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../../services/auth/useUsrStoreService';
import { Form, Input, notification } from 'antd';

import { loginUser } from '../../services/auth/authService';
import AuthButton from './AuthButton';

const LoginForm = () => {
  const [, setError] = useState<string>('');
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
      notification.success({
        message: '로그인 성공!',
        description: `${userData.nickname}님, 환영합니다.`,
        duration: 2,
        placement: 'topRight',
      });
      setTimeout(() => {
        navigate('/bookarchive');
      }, 1500);
    } catch (err) {
      notification.error({
        message: '로그인 실패',
        description:
          err instanceof Object ? err.toString() : '관리자에게 연락주세요.',
        duration: 2,
        placement: 'topRight',
      });
    }
  };

  const handleChangePassword = () => {
    navigate('/changepassword');
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-1/2">
        <Form
          layout="vertical"
          onFinish={handleLogin}
          className="w-full bg-orange-200 p-6 rounded-lg shadow-md"
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

          <div className="flex justify-end">
            <AuthButton htmlType="submit" label="로그인" />
            <AuthButton
              onClick={handleChangePassword}
              label="비밀번호 변경"
              className="mr-4"
            />
          </div>
        </Form>
      </div>
    </div>
  );
};

export default LoginForm;
