import {Cart} from "../interfaces/Cart";
import {TokenService} from "./TokenService";


/**
 * Handles shopping cart related functionality
 */
export class CartService {
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

    async getOrCreateCartForCurrentUser(): Promise<Cart> {
        const response = await fetch(`${viteConfiguration.API_URL}/cart/`, {
            method: 'GET',
            headers: this.headers,
        });
        return this.handleResponse(response);
    }

    async updateCart(updateCart: Cart): Promise<Cart> {
        const response = await fetch(`${viteConfiguration.API_URL}/cart/`, {
            method: 'PUT',
            headers: this.headers,
            body: JSON.stringify(updateCart)
        });
        return this.handleResponse(response);
    }

    async deleteCartForCurrentUser(): Promise<void> {
        const response = await fetch(`${viteConfiguration.API_URL}/cart/`, {
            method: 'DELETE',
            headers: this.headers
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Error: ${response.status} ${response.statusText} - ${errorText}`);
        }
    }
}