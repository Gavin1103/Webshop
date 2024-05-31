import {CategoryResponse} from "../types/CategoryResponse";
import {CategoryPreviewResponse} from "../types/CategoryPreviewResponse";

export class CategoryService {
    public async getRandomCategoriesWithImage(count: number): Promise<CategoryResponse | undefined> {
        const response: Response = await fetch(`${viteConfiguration.API_URL}/categories/withProductImage/${count}`, {
            method: "get",
        });

        if (!response.ok) {
            console.error(response);

            return undefined;
        }

        return (await response.json()) as CategoryResponse;
    }


    public async getCategoriesWithImage(): Promise<CategoryResponse | undefined> {
        const response: Response = await fetch(`${viteConfiguration.API_URL}/categories/withProductImage`, {
            method: "get",
        });

        if (!response.ok) {
            console.error(response);

            return undefined;
        }

        return (await response.json()) as CategoryResponse;
    }

    public async getCategoryByProductName(name: string): Promise<CategoryPreviewResponse[] | undefined> {
        const response: Response = await fetch(`${viteConfiguration.API_URL}/categories/byProductName?name=${name}`, {
            method: "get",
        });

        if (!response.ok) {
            console.error(response);

            return undefined;
        }

        return await response.json();
    }
}