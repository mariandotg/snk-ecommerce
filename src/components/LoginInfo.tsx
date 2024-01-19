'use client';
import { useSession } from 'next-auth/react';
import React from 'react';

const LoginInfo = () => {
  const { data: session, status } = useSession();
  const userEmail = session?.user?.email;

  console.log('session', session);

  if (status === 'authenticated') {
    return <div className='bg-green-800'>email de usuario: {userEmail}</div>;
  }
};

export default LoginInfo;
