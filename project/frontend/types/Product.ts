import { CategoryProduct } from "./CategoryProduct";

export type Product = {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
    categoryProduct: CategoryProduct;
};