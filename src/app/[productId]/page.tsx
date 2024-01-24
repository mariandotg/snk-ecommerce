import React from 'react';
import { Shoe } from '@/models/Shoe';
import ImagePanel from '@/components/ImagePanel';
import Button from '@/components/Button';

interface Props {
  params: {
    productId: string;
  };
}

export default async function ProductPage({ params }: Props) {
  const response = await fetch(
    `http://localhost:3000/api/shoe/${params.productId}`,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  const shoe: Shoe = await response.json();
  console.log(shoe);
  return (
    <div className='grid grid-cols-3 w-full'>
      <div className='grid grid-cols-2 gap-4 col-span-2 p-8'>
        <ImagePanel href={shoe.images[0]} />
        <ImagePanel href={shoe.images[0]} />
        <ImagePanel href={shoe.images[0]} />
        <ImagePanel href={shoe.images[0]} />
      </div>
      <aside className='flex flex-col gap-8 p-8'>
        <div>
          <h1 className='font-medium text-xl'>{shoe.name}</h1>
          <p className='text-gray-400 text-base'>{shoe.description}</p>
          <span className='font-bold text-base'>${shoe.price}</span>
        </div>
        <span>Conocé las promociones</span>
        <ul className='flex gap-2'>
          {shoe.availableSizes.map((size) => {
            return (
              <li className='text-gray-400 border border-gray-400 p-2 w-fit'>
                {size.size}
              </li>
            );
          })}
        </ul>
        <Button>Añadir al carro</Button>
      </aside>
    </div>
  );
}
