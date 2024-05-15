import {Category} from "../../types/responses/Category";

export class CategoryService {
    public async getRandomCategoriesWithImage(count: number): Promise<Category | undefined> {
        const response: Response = await fetch(`${viteConfiguration.API_URL}/categories/withProductImage/${count}`, {
            method: "get",
        });

        if (!response.ok) {
            console.error(response);

            return undefined;
        }

        return (await response.json()) as Category;
    }


    public async getCategoriesWithImage(): Promise<Category | undefined> {
        const response: Response = await fetch(`${viteConfiguration.API_URL}/categories/withProductImage`, {
            method: "get",
        });

        if (!response.ok) {
            console.error(response);

            return undefined;
        }

        return (await response.json()) as Category;
    }
}