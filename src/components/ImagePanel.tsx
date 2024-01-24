import React from 'react';

interface Props {
  href: string;
}

const ImagePanel = ({ href }: Props) => {
  return (
    <div className='relative overflow-hidden w-full aspect-square'>
      <img src={href} className='absolute object-cover h-full' />;
    </div>
  );
};

export default ImagePanel;
