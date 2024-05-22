import { ProductCategory } from "./productCategory";


export type Product = {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
    productCategory: ProductCategory;
};