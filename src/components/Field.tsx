import React from 'react';
import Input from './Input';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';
import { LoginFormValues } from '@/models/LoginFormValues';

interface Props {
  registerFn: UseFormRegisterReturn<keyof LoginFormValues>;
  value: keyof LoginFormValues;
  error: FieldError | undefined;
}

const Field = ({ registerFn, value, error }: Props) => {
  return (
    <label className='flex flex-col gap-y-2'>
      {value.toLocaleUpperCase()}
      <Input registerFn={registerFn} />
      {error && (
        <p className='text-xs italic text-red-500 mt-2'>{error?.message}</p>
      )}
    </label>
  );
};

export default Field;
