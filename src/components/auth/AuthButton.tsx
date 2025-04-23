import React from 'react';
import { Button } from 'antd';

interface AuthButtonProps {
  onClick?: (e: React.FormEvent) => void;
  label: string;
  htmlType?: 'button' | 'submit' | 'reset';
}

const AuthButton: React.FC<AuthButtonProps> = ({
  onClick,
  label,
  htmlType,
}) => {
  return (
    <Button
      color="primary"
      variant="filled"
      onClick={onClick}
      htmlType={htmlType}
    >
      {label}
    </Button>
  );
};

export default AuthButton;
