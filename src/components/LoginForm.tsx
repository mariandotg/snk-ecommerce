'use client';
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { LoginFormValues } from '@/models/LoginFormValues';
import Field from './Field';
import { z } from 'Zod';
import { zodResolver } from '@hookform/resolvers/zod';

const userSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(6),
  })
  .required();

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(userSchema),
  });
  const onSubmit: SubmitHandler<LoginFormValues> = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
      <Field
        value='email'
        registerFn={register('email')}
        error={errors.email}
      />
      <Field
        value='password'
        registerFn={register('password')}
        error={errors.password}
      />
      <input
        type='submit'
        className='bg-primary text-black w-fit px-3 py-1 rounded-sm'
      />
    </form>
  );
};

export default LoginForm;
