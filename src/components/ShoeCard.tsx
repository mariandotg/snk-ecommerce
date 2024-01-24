import { Shoe } from '@/models/Shoe';
import Link from 'next/link';
import React from 'react';

interface Props {
  shoe: Shoe;
}

const ShoeCard = ({ shoe }: Props) => {
  return (
    <Link href={`/${shoe.id}`} className='w-full h-full flex flex-col gap-3'>
      <img src={shoe.images[0]} />
      <div className='flex flex-col gap-2'>
        <h6 className='font-medium text-base'>{shoe.name}</h6>
        <h6 className='font-medium text-xs text-gray-400'>
          {shoe.description}
        </h6>
        <span className='font-bold text-base'>${shoe.price}</span>
      </div>
    </Link>
  );
};

export default ShoeCard;
