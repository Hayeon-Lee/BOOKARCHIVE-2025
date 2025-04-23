import { useState } from 'react';
import requestPasswordReset from '../../services/auth/changePasswordService';
import AuthButton from '../../components/auth/AuthButton';
import { useNavigate } from 'react-router-dom';
import { Form, Input, notification } from 'antd';

const ChangePasswordPage = () => {
  const [, setError] = useState<string>('');
  const [, setSuccess] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleRequest = async (values: {
    nickname: string;
    password: string;
  }) => {
    setError('');
    setSuccess(false);

    try {
      await requestPasswordReset(values.nickname, values.password);
      setSuccess(true);
      notification.success({
        message: '전송 요청 완료',
        description: '관리자에게 전송되었습니다.',
        duration: 2,
        placement: 'topRight',
      });
      setTimeout(() => {
        navigate('/information');
      });
    } catch (err) {
      notification.error({
        message: '전송 실패',
        description:
          err instanceof Object ? err.toString() : '관리자에게 연락주세요.',
        duration: 2,
        placement: 'topRight',
      });
    }
  };

  return (
    <Form
      layout="vertical"
      onFinish={handleRequest}
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
        label="바꿀 비밀번호"
        name="password"
        rules={[{ required: true, message: '비밀번호를 입력해주세요.' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item>
        <AuthButton htmlType="submit" label="관리자에게 전송" />
      </Form.Item>
    </Form>
  );
};

export default ChangePasswordPage;
