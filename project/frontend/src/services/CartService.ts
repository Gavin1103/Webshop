import {UpdateCart} from "../interfaces/UpdateCart";
import {CartItem} from "../components/helpers/CartHelpers";

const headers: { "Content-Type": string } = {
    "Content-Type": "application/json"
};

/**
 * Handles shopping cart related functionality
 */
export class CartService {

    private async handleResponse(response: Response) {
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Error: ${response.status} ${response.statusText} - ${errorText}`);
        }
        return response.json();
    }

    async getOrCreateCartForCurrentUser(): Promise<CartItem[]> {
        const token = localStorage.getItem('token');

        const response = await fetch(`${viteConfiguration.API_URL}/cart/`, {
            method: 'get',
            headers: {...headers, authorization: 'Bearer ' + token},
        });
        return this.handleResponse(response);
    }

    async updateCart(updateCartDTO: UpdateCart): Promise<CartItem[]> {
        const token = localStorage.getItem('token');

        const response = await fetch(`${viteConfiguration.API_URL}/cart/`, {
            method: 'PUT',
            headers: {...headers, authorization: 'Bearer ' + token},
            body: JSON.stringify(updateCartDTO)
        });
        return this.handleResponse(response);
    }

    async deleteCartForCurrentUser(): Promise<void> {
        const token = localStorage.getItem('token');

        const response = await fetch(`${viteConfiguration.API_URL}/cart/`, {
            method: 'DELETE',
            headers: {...headers, authorization: 'Bearer ' + token}
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Error: ${response.status} ${response.statusText} - ${errorText}`);
        }
    }
}