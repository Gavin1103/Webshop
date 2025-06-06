import {Product} from "../types/product/Product";
import {ProductPreviewResponse} from "../types/product/ProductPreviewResponse";
import {FilterRequest} from "../types/overviewPage/FilterRequest";
import {ProductOverviewResponse} from "../types/product/ProductOverviewResponse";
import {ProductSearchResponse} from "../types/product/ProductSearchResponse";
import { ProductReviews } from "../types/product/ProductReviews";

export class ProductService {
    public getToken(): string | undefined {
        return localStorage.getItem("token") || undefined;
    }

    public async deleteProduct(productId: number): Promise<void | undefined> {
        const token: string | undefined = this.getToken();
        const response: Response = await fetch(`${viteConfiguration.API_URL}/products/${productId}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
        });

        if (!response.ok) {
            console.error(response);
            return undefined;
        }
    }

    public async addProduct(addProduct: Product): Promise<Product | undefined> {
        const token: string | undefined = this.getToken();
        const response: Response = await fetch(`${viteConfiguration.API_URL}/products/add`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(addProduct)
        });

        if (!response.ok) {
            console.error(response);
            return undefined;
        }

        return (await response.json()) as Product;
    }


    public async updateProduct(productId: number, updatedProduct: Product): Promise<Product | undefined> {
        const token: string | undefined = this.getToken();
        const response: Response = await fetch(`${viteConfiguration.API_URL}/products/${productId}`, {
            method: "put",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(updatedProduct)
        });

        if (!response.ok) {
            console.error(response);
            return undefined;
        }

        return (await response.json()) as Product;
    }

    public async getAllProducts(): Promise<Product[] | undefined> {
        const response: Response = await fetch(`${viteConfiguration.API_URL}/products`, {
            method: "get",
        });

        if (!response.ok) {
            console.error(response);

            return undefined;
        }

        return (await response.json()) as Product[];
    }

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
        const response: Response = await fetch(`${viteConfiguration.API_URL}/products/${id}`, {
            method: "GET",
        });

        if (!response.ok) {
            return undefined;
        }

        return await response.json();
    }

    public async getFilteredProduct(filterRequest?: FilterRequest, presetCategory?: string, presetQuery?:string, isDiscounted?:boolean): Promise<ProductOverviewResponse | undefined> {
        let url: string = "/products/filter?";

        if (isDiscounted) {
            url += `isDiscounted=${isDiscounted}&`;
        }

        if (presetCategory) {
            url += `categories=${presetCategory}&`;
        }

        if (filterRequest) {
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
        }


        if (presetQuery) {
            url += `name=${presetQuery}&`;
        }

        url = url.endsWith('&') || url.endsWith('?') ? url.slice(0, -1) : url;

        const response: Response = await fetch(`${viteConfiguration.API_URL}${url}`, {
            method: "GET",
        });

        if (!response.ok) {
            return undefined;
        }


        return await response.json();
    }

    public async searchProducts(query: string): Promise<ProductSearchResponse[] | undefined> {
        const response: Response = await fetch(`${viteConfiguration.API_URL}/products/search?keyword=${query}`, {
            method: "get",
        });

        if (!response.ok) {
            console.error(response);

            return undefined;
        }

        return await response.json();
    }

    public async getReviewsOfProduct(productId: number):Promise<ProductReviews | undefined>{
        const response: Response = await fetch(`${viteConfiguration.API_URL}/products/reviews/${productId}`, {
            method: "get",
        });

        if (!response.ok) {
            console.error(response);

            return undefined;
        }

        return await response.json() as ProductReviews;
    }
}
