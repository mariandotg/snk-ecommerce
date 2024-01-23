import { ShoeStock } from './ShoeStock';

export interface Shoe {
  images: string[];
  availableSizes: ShoeStock[];
  id: number;
  name: string | null;
  description: string | null;
  price: string | null;
}
