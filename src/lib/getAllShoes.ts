import { Shoe } from '@/models/Shoe';
import { db } from './db';
import { shoeImages, shoeStock, shoes } from './db/schema';
import { eq } from 'drizzle-orm';

export default async function getAllShoes(): Promise<Shoe[]> {
  console.log(shoes);

  const shoesData = await db
    .select({
      id: shoes.id,
      name: shoes.description,
      description: shoes.description,
      price: shoes.price,
    })
    .from(shoes);

  const shoesWithSizes = await Promise.all(
    shoesData.map(async (shoe) => {
      const sizesData = await db
        .select({
          size: shoeStock.size,
        })
        .from(shoeStock)
        .where(eq(shoeStock.shoeId, shoe.id));

      const availableSizes = sizesData.map((sizeData) => sizeData.size);

      return {
        ...shoe,
        availableSizes,
      };
    })
  );

  const shoesWithImages = await Promise.all(
    shoesWithSizes.map(async (shoe) => {
      const imagesData = await db
        .select({
          image: shoeImages.imageUrl,
        })
        .from(shoeImages)
        .where(eq(shoeImages.shoeId, shoe.id));

      const images = imagesData.map((imageData) => imageData.image);

      return {
        ...shoe,
        images,
      };
    })
  );

  return shoesWithImages;
}
