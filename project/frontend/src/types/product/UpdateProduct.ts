export type UpdateProduct = {
    id: number;
    name: string;
    stock: number;
    description: string;
    currentPrice: number;
    originalPrice: number;
    image: string[];
    productCategory: string;
}