import React, { useState } from 'react';
import loginUser from '../../services/authService';
import AuthButton from './AuthButton';

const LoginForm = () => {
  const [nickname, setNickName] = useState<string>('');
  const [password, setPassWord] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<boolean>(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    try {
      const userData = await loginUser(nickname, password);
      //TODO: 삭제할 것
      console.log('로그인 성공: ', userData);
      setSuccess(true);
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input
        type="text"
        placeholder="오픈 채팅방 닉네임"
        value={nickname}
        onChange={(e) => setNickName(e.target.value)}
      />
      <input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassWord(e.target.value)}
      />
      <AuthButton onClick={handleLogin} />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>로그인 성공!</p>}
    </form>
  );
};

export default LoginForm;
