import React from 'react';
import { shoes } from '../../../shoes';
import { redirect } from 'next/navigation';

interface Props {
  params: {
    productId: string;
  };
}
export default function ProductPage({ params }: Props) {
  const filteredShoe = shoes.find((shoe) => shoe.id === params.productId);

  if (!filteredShoe) redirect('/not-found');

  return (
    <div>
      <img src='https://nikearprod.vtexassets.com/arquivos/ids/762016-800-800?v=638316084472370000&width=800&height=800&aspect=true' />
      <div className='flex flex-col gap-2'>
        <h6 className='font-medium text-base'>{filteredShoe.name}</h6>
        <span className='font-bold text-base'>${filteredShoe.price}</span>
      </div>
    </div>
  );
}
