'use client';
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { LoginFormValues } from '@/models/LoginFormValues';
import Field from './Field';

const LoginForm = () => {
  const { register, handleSubmit } = useForm<LoginFormValues>();
  const onSubmit: SubmitHandler<LoginFormValues> = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
      <Field value='email' registerFn={register('email')} />
      <Field value='password' registerFn={register('password')} />
      <input
        type='submit'
        className='bg-primary text-black w-fit px-3 py-1 rounded-sm'
      />
    </form>
  );
};

export default LoginForm;
