import React, { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  onClick?: () => void;
  type?: 'submit' | 'button';
}

const Button = ({ children, onClick, type = 'button' }: Props) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className='bg-primary text-black px-3 py-1 rounded-sm'
    >
      {children}
    </button>
  );
};

export default Button;
