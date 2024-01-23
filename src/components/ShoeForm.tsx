'use client';
import React from 'react';
import { useForm, SubmitHandler, useFieldArray } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'next-auth/react';
import { ShoeFormValues } from '@/models/ShoeFormValues';
import Field from './Field';
import Button from './Button';

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
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4 p-4'>
      <Field value='Nombre' registerFn={register('name')} error={errors.name} />
      <Field
        value='Descripción'
        registerFn={register('description')}
        error={errors.description}
      />
      <Field
        value='Precio'
        inputType='number'
        defaultValue={0}
        registerFn={register('price', { valueAsNumber: true })}
        error={errors.price}
      />
      <Field
        value='URL de imagen'
        registerFn={register('imageUrl')}
        error={errors.imageUrl}
      />

      <label>Talles</label>
      {fields.map((size, index) => (
        <div key={size.id} className='grid grid-cols-2 gap-4'>
          <Field<any>
            value='Talle'
            registerFn={register(`availableSizes.${index}.size`)}
            error={errors?.availableSizes?.[index]?.size}
          />
          <Field<any>
            value='Stock de talle'
            inputType='number'
            defaultValue={0}
            registerFn={register(`availableSizes.${index}.stock`, {
              valueAsNumber: true,
            })}
            error={errors?.availableSizes?.[index]?.stock}
          />
        </div>
      ))}

      <Button onClick={() => append({ size: '', stock: 0 })}>
        Añadir un nuevo talle
      </Button>

      <Button type='submit'>Enviar</Button>
    </form>
  );
};

export default ShoeForm;
