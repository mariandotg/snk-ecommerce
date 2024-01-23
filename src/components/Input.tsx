import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

interface Props<T> {
  registerFn: UseFormRegisterReturn<Extract<keyof T, string>>;
  type?: 'number' | 'text' | 'email';
  placeholder?: string;
  defaultValue?: number | string;
}

const Input = <T,>({
  registerFn,
  type = 'text',
  placeholder = 'placeholder text',
  defaultValue,
}: Props<T>) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      defaultValue={defaultValue}
      {...registerFn}
      className='px-3 py-1 rounded-sm text-black'
    />
  );
};

export default Input;
