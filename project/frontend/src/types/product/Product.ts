import { ProductCategory } from "./ProductCategory";

export type Product = {
    id: number;
    name: string;
    stock: number;
    description: string;
    currentPrice: number;
    originalPrice: number;
    image: string[];
    productCategory: ProductCategory;
};