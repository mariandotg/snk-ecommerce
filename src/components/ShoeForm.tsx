'use client';
import React from 'react';
import { useForm, SubmitHandler, useFieldArray } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'next-auth/react';
import { ShoeFormValues } from '@/models/ShoeFormValues';
import Field from './Field';

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
      <Field value='name' registerFn={register('name')} error={errors.name} />
      <Field
        value='description'
        registerFn={register('description')}
        error={errors.description}
      />
      <Field
        value='price'
        inputType='number'
        defaultValue={0}
        registerFn={register('price', { valueAsNumber: true })}
        error={errors.price}
      />
      <Field
        value='imageUrl'
        registerFn={register('imageUrl')}
        error={errors.imageUrl}
      />

      {fields.map((size, index) => (
        <div key={size.id} className='flex flex-col gap-y-2'>
          <Field<any>
            value={`availableSizes[${index}].size`}
            registerFn={register(`availableSizes.${index}.size`)}
            error={errors?.availableSizes?.[index]?.size}
          />
          <Field<any>
            value={`availableSizes[${index}].stock`}
            inputType='number'
            defaultValue={0}
            registerFn={register(`availableSizes.${index}.stock`, {
              valueAsNumber: true,
            })}
            error={errors?.availableSizes?.[index]?.stock}
          />
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
