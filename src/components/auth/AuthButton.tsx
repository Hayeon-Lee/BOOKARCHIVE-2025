import React from 'react';
import { Button } from 'antd';

interface AuthButtonProps {
  onClick: (e: React.FormEvent) => void;
  label: string;
}

const AuthButton: React.FC<AuthButtonProps> = ({ onClick, label }) => {
  return (
    <Button color="primary" variant="filled" onClick={onClick}>
      {label}
    </Button>
  );
};

export default AuthButton;
