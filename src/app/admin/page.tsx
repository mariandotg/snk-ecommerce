import ShoeForm from '@/components/ShoeForm';
import { getServerSession } from 'next-auth';
import React from 'react';

interface Props {}

export default async function AdminPage({}: Props) {
  const session = await getServerSession();

  if (!session || !session.user) {
    return <div className='bg-red-500'>PROTECTED ROUTE</div>;
  }

  return (
    <div>
      <ShoeForm />
    </div>
  );
}
