import { RegisterFormValues } from '@/models/RegisterFormValues';
import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

interface Props {
  registerFn: UseFormRegisterReturn<keyof RegisterFormValues>;
}

const Input = ({ registerFn }: Props) => {
  return <input {...registerFn} />;
};

export default Input;
