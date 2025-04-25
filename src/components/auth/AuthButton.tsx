import React from 'react';
import { Button } from 'antd';

interface AuthButtonProps {
  onClick?: (e: React.FormEvent) => void;
  label: string;
  htmlType?: 'button' | 'submit' | 'reset';
  className?: string;
}

const AuthButton: React.FC<AuthButtonProps> = ({
  onClick,
  label,
  htmlType,
  className,
}) => {
  return (
    <Button
      color={label == '로그인' ? 'primary' : 'danger'}
      variant={label == '로그인' ? 'filled' : 'text'}
      onClick={onClick}
      htmlType={htmlType}
      className={className}
    >
      {label}
    </Button>
  );
};

export default AuthButton;
