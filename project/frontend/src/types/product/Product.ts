import { ProductCategory } from "./ProductCategory";

export type Product = {
    id: number;
    name: string;
    description: string;
    currentPrice: number;
    image: string;
    productCategory: ProductCategory;
};