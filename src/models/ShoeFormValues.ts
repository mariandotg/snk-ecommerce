import { ShoeStock } from './ShoeStock';

export interface ShoeFormValues {
  name: string;
  description: string;
  price: string;
  imageUrl: string;
  availableSizes: ShoeStock[];
}
