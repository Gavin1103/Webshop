import {Product} from "../types/Product";
import {ProductPreviewResponse} from "../types/ProductPreviewResponse";
import {FilterRequest} from "../types/overviewPage/FilterRequest";
import {ProductOverviewResponse} from "../types/ProductOverviewResponse";

export class ProductService {
    public async getTopDealProducts(): Promise<ProductPreviewResponse | undefined> {
        const response: Response = await fetch(`${viteConfiguration.API_URL}/products/topDeals`, {
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
        const response: Response = await fetch(`${viteConfiguration.API_URL}/products/getBy/${id}`, {
            method: "GET",
        });

        if (!response.ok) {
            return undefined;
        }

        return await response.json();
    }

    public async getFilteredProduct(filterRequest: FilterRequest, presetCategory?: string): Promise<ProductOverviewResponse | undefined> {
        let url: string = "/products/filter?";

        if (!filterRequest) {
            return undefined
        }

        if (presetCategory) {
            url += `categories=${presetCategory}&`;
        }

        if (filterRequest.categories && !presetCategory) {
            if (filterRequest.categories.length > 0) {
                const categories = filterRequest.categories.join(',');
                url += `categories=${categories}`;
            }
            url += "&";
        }


        if (filterRequest.priceRange) {
            if (filterRequest.priceRange.min) {
                url += `minPrice=${filterRequest.priceRange.min}&`;
            }

            if (filterRequest.priceRange.max) {
                url += `maxPrice=${filterRequest.priceRange.max}&`;
            }
        }

        if (filterRequest.ratings) {
            url += `minRating=${filterRequest.ratings}&`;
        }

        url = url.endsWith('&') || url.endsWith('?') ? url.slice(0, -1) : url;

        console.log(url);

        const response: Response = await fetch(`${viteConfiguration.API_URL}${url}`, {
            method: "GET",
        });

        if (!response.ok) {
            return undefined;
        }


        return await response.json();
    }
}
