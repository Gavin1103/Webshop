import { Product } from "../../types/Product";

const headers: { "Content-Type": string } = {
    "Content-Type": "application/json",
};

export class ProductService {
    public async getProductById(id: number): Promise<Product | undefined> {
        const requestHeaders: Headers = new Headers(headers);

        const response: Response = await fetch(`${viteConfiguration.API_URL}product/getBy/${id}`, {
            method: "GET",
            headers: requestHeaders,
        });

        if (!response.ok) {
            return undefined;
        }

        const productData: any = await response.json();

        const product: Product = {
            id: productData.id,
            name: productData.name,
            description: productData.description,
            price: productData.price,
            image: productData.image,
            categoryProduct: productData.category,
        };

        return product;
    }
}
