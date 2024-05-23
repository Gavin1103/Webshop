import { ProductCategory } from "./ProductCategory";


export type Product = {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
    productCategory: ProductCategory;
};