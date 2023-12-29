'use client';
import React, { useState } from 'react';
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

const LoginForm = () => {
  const [isLogged, setIsLogged] = useState<boolean>(false);
  const [error, setError] = useState<string>();
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
    const result = await fetch('api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then((data) => data.json());

    if (result.success) setIsLogged(result.success);
    else setError('no se pudo iniciar sesión');
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
      {<p className='bg-red-500'>{error}</p>}
      {isLogged && (
        <>
          <p className='bg-green-500'>LOGGED</p>
          <button className='bg-primary' onClick={() => setIsLogged(false)}>
            close session
          </button>
        </>
      )}
    </form>
  );
};

export default LoginForm;
