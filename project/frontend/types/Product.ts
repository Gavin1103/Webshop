import { CategoryProduct } from "./CategoryProduct";
import { TypeProduct } from "./TypeProduct";

export type Product = {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
    typeProduct: TypeProduct;
    categoryProduct: CategoryProduct;
};


