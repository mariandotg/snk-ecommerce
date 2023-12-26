import { LoginFormValues } from '@/models/LoginFormValues';
import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

interface Props {
  registerFn: UseFormRegisterReturn<keyof LoginFormValues>;
}

const Input = ({ registerFn }: Props) => {
  return <input {...registerFn} />;
};

export default Input;
