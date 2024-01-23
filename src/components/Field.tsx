import React from 'react';
import Input from './Input';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';

interface Props<T> {
  registerFn: UseFormRegisterReturn<Extract<keyof T, string>>;
  value: string;
  error: FieldError | undefined;
  inputType?: 'number' | 'text' | 'email';
  placeholder?: string;
  defaultValue?: number | string;
}

const Field = <T,>({
  registerFn,
  value,
  error,
  inputType,
  placeholder,
  defaultValue,
}: Props<T>) => {
  return (
    <label className='flex flex-col gap-y-2 text-base'>
      {value}
      <Input
        registerFn={registerFn}
        type={inputType}
        placeholder={placeholder}
        defaultValue={defaultValue}
      />
      {error && (
        <p className='text-xs italic text-red-500 w-fit'>{error?.message}</p>
      )}
    </label>
  );
};

export default Field;
