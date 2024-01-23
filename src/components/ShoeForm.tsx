'use client';
import React from 'react';
import { useForm, SubmitHandler, useFieldArray } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'next-auth/react';
import addShoe from '@/lib/addShoe';
import { ShoeFormValues } from '@/models/ShoeFormValues';

const shoeSchema = z
  .object({
    name: z.string().min(1),
    description: z.string().min(1),
    price: z.number().positive().int().finite(),
    imageUrl: z.string().min(1),
    availableSizes: z.array(
      z.object({
        size: z.string().min(1).max(10),
        stock: z.number().nonnegative().int().finite(),
      })
    ),
  })
  .required();

const ShoeForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<ShoeFormValues>({
    resolver: zodResolver(shoeSchema),
  });

  const { fields, append } = useFieldArray({
    control,
    name: 'availableSizes',
  });

  const { data: session } = useSession();

  const onSubmit: SubmitHandler<ShoeFormValues> = async (data) => {
    fetch('api/shoe', {
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
      <label className='flex flex-col gap-y-2'>
        name
        <input {...register('name')} />
        {errors?.name && (
          <p className='text-xs italic text-red-500 mt-2'>
            {errors.name.message}
          </p>
        )}
      </label>
      <label className='flex flex-col gap-y-2'>
        description
        <input {...register('description')} />
        {errors?.description && (
          <p className='text-xs italic text-red-500 mt-2'>
            {errors.description.message}
          </p>
        )}
      </label>
      <label className='flex flex-col gap-y-2'>
        price
        <input
          type='number'
          defaultValue={0}
          {...register('price', { valueAsNumber: true })}
        />
        {errors?.price && (
          <p className='text-xs italic text-red-500 mt-2'>
            {errors.price.message}
          </p>
        )}
      </label>
      <label className='flex flex-col gap-y-2'>
        imageUrl
        <input {...register('imageUrl')} />
        {errors?.imageUrl && (
          <p className='text-xs italic text-red-500 mt-2'>
            {errors.imageUrl.message}
          </p>
        )}
      </label>

      {fields.map((size, index) => (
        <div key={size.id} className='flex flex-col gap-y-2'>
          <label>
            Tamaño
            <input
              placeholder='size'
              {...register(`availableSizes.${index}.size`)}
            />
            {errors?.availableSizes?.[index]?.size && (
              <p className='text-xs italic text-red-500 mt-2'>
                {errors.availableSizes?.[index]?.size?.message}
              </p>
            )}
          </label>
          <label>
            Stock
            <input
              type='number'
              defaultValue={0}
              {...register(`availableSizes.${index}.stock`, {
                valueAsNumber: true,
              })}
            />
            {errors?.availableSizes?.[index]?.stock && (
              <p className='text-xs italic text-red-500 mt-2'>
                {errors.availableSizes?.[index]?.stock?.message}
              </p>
            )}
          </label>
        </div>
      ))}

      <button type='button' onClick={() => append({ size: '', stock: 0 })}>
        Add size stock
      </button>

      <input
        type='submit'
        className='bg-primary text-black w-fit px-3 py-1 rounded-sm'
      />
    </form>
  );
};

export default ShoeForm;
