import { useState } from 'react';

const LoginForm = () => {
  const [nickname, setNickName] = useState<string>('');
  const [password, setPassWord] = useState<string>('');
  const [error, setError] = useState<string>('');

  return (
    <form>
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
    </form>
  );
};

export default LoginForm;
