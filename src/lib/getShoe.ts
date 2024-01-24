import { db } from './db';
import { shoeImages, shoeStock, shoes } from './db/schema';
import { eq } from 'drizzle-orm';
import { Shoe } from '@/models/Shoe';

export const getShoe = async (id: number): Promise<Shoe | undefined> => {
  const shoe = await db.query.shoes.findFirst({
    where: eq(shoes.id, id),
    columns: {
      created_at: false,
      updated_at: false,
    },
  });

  if (!shoe) return undefined;

  const stock = await db.query.shoeStock.findMany({
    where: eq(shoeStock.shoeId, id),
    columns: {
      size: true,
      stock: true,
    },
  });

  const images = await db.query.shoeImages.findMany({
    where: eq(shoeImages.shoeId, id),
    columns: {
      imageUrl: true,
    },
  });

  const imagesArr = images.map((img) => img.imageUrl);

  return {
    ...shoe,
    availableSizes: stock,
    images: imagesArr,
  };
};
