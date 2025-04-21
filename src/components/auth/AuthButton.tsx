import React from 'react';

interface AuthButtonProps {
  onClick: (e: React.FormEvent) => void;
  label: string;
}

const AuthButton: React.FC<AuthButtonProps> = ({ onClick, label }) => {
  return <button onClick={onClick}>{label}</button>;
};

export default AuthButton;
