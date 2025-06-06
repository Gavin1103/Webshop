import {ProductItem} from "../interfaces/Cart";

/**
 * Handles order item related functionality
 */
export class OrderItemService {
    /**
     * Get all order items
     *
     * @returns A list of all order items when successful, otherwise `undefined`.
     */
    public async getAll(): Promise<ProductItem[] | undefined> {
        const response: Response = await fetch(`${viteConfiguration.API_URL}orderItems`, {
            method: "get",
        });

        if (!response.ok) {
            console.error(response);

            return undefined;
        }

        return (await response.json()) as ProductItem[];
    }
}
