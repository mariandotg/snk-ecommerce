'use client';
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { RegisterFormValues } from '@/models/RegisterFormValues';
import Field from './Field';
import { z } from 'Zod';
import { zodResolver } from '@hookform/resolvers/zod';

const userSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(6),
  })
  .required();

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(userSchema),
  });

  const onSubmit: SubmitHandler<RegisterFormValues> = async (data) => {
    console.log(data);
    fetch('api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    reset();
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

export default RegisterForm;
