import { getServerSession } from 'next-auth';
import React from 'react';

interface Props {}

export default async function AdminPage({}: Props) {
  // const filteredShoe = shoes.find((shoe) => shoe.id === params.productId);

  const session = await getServerSession();
  // if (!filteredShoe) redirect('/not-found');
  console.log('admin page');
  console.log(session);

  if (!session || !session.user) {
    return <div className='bg-red-500'>PROTECTED ROUTE</div>;
  }

  return (
    <div>
      <form>
        <div>
          <label>Name</label>
          <input name='name' />
        </div>
        <div>
          <label>Description</label>
          <textarea name='description' />
        </div>
        <div>
          <label>Price</label>
          <input name='price' />
        </div>
      </form>
    </div>
  );
}
