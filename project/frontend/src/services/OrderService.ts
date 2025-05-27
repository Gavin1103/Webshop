import {TokenService} from "./TokenService";
import {Order} from "../types/Order";
import {CreateCustomerOrder} from "../interfaces/Order";


/**
 * Handles shopping cart related functionality
 */
export class OrderService {
    private _tokenService: TokenService = new TokenService();

    private headers: { "Content-Type": string, "Authorization": string } = {
        "Content-Type": "Application/json",
        "Authorization": "Bearer " + this._tokenService.getToken()
    };

    private async handleResponse(response: Response) {
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Error: ${response.status} ${response.statusText} - ${errorText}`);
        }
        return response.json();
    }

    async getAllOrder(): Promise<Order[]> {
        const response = await fetch(`${viteConfiguration.API_URL}/orders/`, {
            method: 'GET',
            headers: this.headers,
        });
        return this.handleResponse(response);
    }

    async deleteOrder(orderId: number): Promise<void | undefined> {
        const response = await fetch(`${viteConfiguration.API_URL}/orders/${orderId}`, {
            method: 'DELETE',
            headers: this.headers,
        });

        if (!response.ok) {
            console.error(response);
            return undefined;
        }
    }

    async createOrder(order: CreateCustomerOrder): Promise<Order | undefined> {
        const response: Response = await fetch(`${viteConfiguration.API_URL}/orders/create`, {
            method: "POST",
            headers: {
                "Content-Type": "Application/json",
            },
            body: JSON.stringify(order)
        });

        if (!response.ok) {
            console.error(response);
            return undefined;
        }

        return (await response.json()) as Order;
    }
}