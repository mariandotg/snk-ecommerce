import React from 'react';
import Input from './Input';
import { UseFormRegisterReturn } from 'react-hook-form';
import { LoginFormValues } from '@/models/LoginFormValues';

interface Props {
  registerFn: UseFormRegisterReturn<keyof LoginFormValues>;
  value: keyof LoginFormValues;
}

const Field = ({ registerFn, value }: Props) => {
  return (
    <label className='flex flex-col gap-y-2'>
      {value.toLocaleUpperCase()}
      <Input registerFn={registerFn} />
    </label>
  );
};

export default Field;
