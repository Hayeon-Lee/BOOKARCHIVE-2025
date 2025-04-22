import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../../services/auth/useUsrStoreService';

import { loginUser } from '../../services/auth/authService';
import AuthButton from './AuthButton';

const LoginForm = () => {
  const [nickname, setNickName] = useState<string>('');
  const [password, setPassWord] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<boolean>(false);

  const navigate = useNavigate();

  const { setUser } = useUserStore();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    try {
      const userData = await loginUser(nickname, password);
      setUser({
        userId: userData.userId,
        nickname: userData.nickname,
      });

      setSuccess(true);
      navigate('/bookarchive');
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const handleChangePassword = () => {
    navigate('/changepassword');
  };

  return (
    <form onSubmit={handleLogin}>
      <input
        type="text"
        placeholder="오픈 채팅방 닉네임"
        value={nickname}
        required
        onChange={(e) => setNickName(e.target.value)}
      />
      <input
        type="password"
        placeholder="비밀번호"
        value={password}
        required
        onChange={(e) => setPassWord(e.target.value)}
      />
      <AuthButton onClick={handleLogin} label="로그인" />
      <AuthButton onClick={handleChangePassword} label="비밀번호 변경" />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>로그인 성공!</p>}
    </form>
  );
};

export default LoginForm;
