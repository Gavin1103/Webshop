import {CategoryResponse} from "../types/responses/CategoryResponse";

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
}