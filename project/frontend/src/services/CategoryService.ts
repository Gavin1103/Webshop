import {CategoryResponse} from "../types/product/CategoryResponse";
import {CategoryPreviewResponse} from "../types/product/CategoryPreviewResponse";
import {ProductCategory} from "../types/product/ProductCategory";

export class CategoryService {
    public async getAllCategories():Promise<ProductCategory[] | undefined> {
        const response: Response = await fetch(`${viteConfiguration.API_URL}/categories`, {
            method: "get",
        });

        if (!response.ok) {
            console.error(response);

            return undefined;
        }

        return await response.json();
    }

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

    public async getCategoriesByProductName(name: string): Promise<CategoryPreviewResponse[] | undefined> {
        const response: Response = await fetch(`${viteConfiguration.API_URL}/categories/byProductName?name=${name}`, {
            method: "get",
        });

        if (!response.ok) {
            console.error(response);

            return undefined;
        }

        return await response.json();
    }

    public async getPromotionCategories(): Promise<CategoryPreviewResponse[] | undefined> {
        const response: Response = await fetch(`${viteConfiguration.API_URL}/categories/discounted-products`, {
            method: "get",
        });

        if (!response.ok) {
            console.error(response);

            return undefined;
        }

        return await response.json();
    }

}