export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  discount: number;
  quantity: number;
  featured: boolean;
  categoryId: number;
}
