import { Product } from "../../types/Product";
import { TokenService } from "./TokenService";

const headers: { "Content-Type": string } = {
    "Content-Type": "application/json",
};

export class ProductService {

    private _tokenService: TokenService = new TokenService();
    
   
    public async getProductById(id: number): Promise<Product | undefined> {
        const token: string | undefined = this._tokenService.getToken();
        const requestHeaders: Headers = new Headers(headers);

        if (token) {
            requestHeaders.append("Authorization", `Bearer ${token}`);
        }

        const response: Response = await fetch(`${viteConfiguration.API_URL}product/${id}`, {
            method: "GET",
            headers: requestHeaders
        });

        if (!response.ok) {
            return undefined;
        }

        try {

            console.log("Fetched product:", await response.json());
            return undefined; // Return the product object
        } catch (error) {
            console.error("Error parsing JSON:", error);
            return undefined; // Handle JSON parsing errors gracefully
        }
    }
}
