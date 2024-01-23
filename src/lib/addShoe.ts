'use server';
import { db } from './db';
import { shoeImages, shoeStock, shoes } from './db/schema';
import { ShoeFormValues } from '@/models/ShoeFormValues';

export default async function addShoe(values: ShoeFormValues) {
  await db.transaction(async (transaction) => {
    const { name, description, price, availableSizes, imageUrl } = values;
    const shoeId = await transaction.insert(shoes).values({
      name,
      description,
      price,
    });

    await transaction.insert(shoeImages).values({
      shoeId: shoeId[0].insertId,
      imageUrl,
    });

    availableSizes.forEach(async ({ size, stock }) => {
      await transaction.insert(shoeStock).values({
        shoeId: shoeId[0].insertId,
        size,
        stock,
      });
    });
  });
}
