import {ProductHomePage} from "../../types/responses/homePage/ProductHomePage";

export class ProductService {
    public async getTopDealProducts():Promise<ProductHomePage | undefined> {
        const response: Response = await fetch(`${viteConfiguration.API_URL}/products/topDeals`, {
            method: "get",
        });

        if (!response.ok) {
            console.error(response);

            return undefined;
        }

        return (await response.json()) as ProductHomePage;
    }

    public async getRecommendProducts():Promise<ProductHomePage | undefined> {
        const response: Response = await fetch(`${viteConfiguration.API_URL}/products/recommend`, {
            method: "get",
        });

        if (!response.ok) {
            console.error(response);

            return undefined;
        }

        return (await response.json()) as ProductHomePage;
    }
}