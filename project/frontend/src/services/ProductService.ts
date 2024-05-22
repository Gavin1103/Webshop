import { Product } from "../types/Product";
import { ProductPreviewResponse } from "../types/ProductPreviewResponse";

export class ProductService {
    public async getTopDealProducts(): Promise<ProductPreviewResponse | undefined> {
        const response: Response = await fetch(`${viteConfiguration.API_URL}products/topDeals`, {
            method: "get",
        });

        if (!response.ok) {
            console.error(response);

            return undefined;
        }

        return (await response.json()) as ProductPreviewResponse;
    }

    public async getRecommendProducts(): Promise<ProductPreviewResponse | undefined> {
        const response: Response = await fetch(`${viteConfiguration.API_URL}/products/recommend`, {
            method: "get",
        });

        if (!response.ok) {
            console.error(response);

            return undefined;
        }

        return (await response.json()) as ProductPreviewResponse;
    }
    public async getProductById(id: number): Promise<Product | undefined> {
        const response: Response = await fetch(`${viteConfiguration.API_URL}product/getBy/${id}`, {
            method: "GET",
        });

        if (!response.ok) {
            return undefined;
        }

        const product: Product = await response.json();

        return product;
    }
}
