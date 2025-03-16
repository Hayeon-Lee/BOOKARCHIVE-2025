import React from 'react';

interface AuthButtonProps {
  onClick: (e: React.FormEvent) => void;
}

const AuthButton: React.FC<AuthButtonProps> = ({ onClick }) => {
  return <button onClick={onClick}>로그인</button>;
};

export default AuthButton;
