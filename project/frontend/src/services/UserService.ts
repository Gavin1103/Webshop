import "../hboictcloud-config";
import {TokenService} from "./TokenService";
import {UserLoginFormModel} from "../types/UserLoginFormModel";
import {UserRegisterFormModel} from "../types/UserRegisterFormModel";
import {api} from "@hboictcloud/api";
import {Email} from "../types/Email";
import {UserAuthResponse} from "../types/UserAuthResponse";
import {RegistrationEmail} from "../types/RegistrationEmail";


const headers: { "Content-Type": string } = {
    "Content-Type": "application/json",
};

/**
 * Handles user related functionality
 */
export class UserService {
    private _tokenService: TokenService = new TokenService();

    /**
     * Handles user login
     *
     * @param formData - Data to use during login
     *
     * @returns `true` when successful, otherwise `false`.
     */
    public async login(formData: UserLoginFormModel): Promise<UserAuthResponse> {
        const response: Response = await fetch(`${viteConfiguration.API_URL}/auth/authenticate`, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(formData),
        });

        if (!response.ok) {
            return {success: false, status: response.status, message: "Invalid credentials"};
        }

        const json: { access_token: string, refresh_token: string } = await response.json();

        if (json.access_token && json.refresh_token) {
            this._tokenService.setToken(json.access_token);
            this._tokenService.setRefreshToken(json.refresh_token);

            return {success: true};
        }

        return {success: false};
    }

    /**
     * Handles user registration
     *
     * @param formData - Data to use during registration
     *
     * @returns `true` when successful, otherwise `false`.
     */
    public async register(formData: UserRegisterFormModel): Promise<UserAuthResponse> {
        const response: Response = await fetch(`${viteConfiguration.API_URL}/auth/register`, {
            method: "post",
            headers: headers,
            body: JSON.stringify(formData),
        });

        if (!response.ok) {
            console.error(response);

            return {success: false};
        }

        const json: {
            statusCodeValue: number,
            body: { access_token: string | undefined, refresh_token: string | undefined }
        } = await response.json();

        if (json.body.access_token && json.body.refresh_token && json.statusCodeValue === 201) {
            this._tokenService.setToken(json.body.access_token);
            this._tokenService.setRefreshToken(json.body.refresh_token);

            const email: Email = new Email();
            email.to = [{name: formData.firstname, address: formData.email}];
            email.subject = "Welcome to our webshop!";
            email.html = new RegistrationEmail(formData).generateEmail();

            await this.sendEmail(email);

            return {success: true, status: json.statusCodeValue};
        } else if (json.statusCodeValue === 409) {
            return {success: false, status: json.statusCodeValue, message: "User already exists"};
        }

        return {success: false};
    }

    /**
     * Handles user logout
     *
     * @returns `true` when successful, otherwise `false`.
     */
    public async logout(): Promise<boolean> {
        const token: string | undefined = this._tokenService.getToken();

        if (!token) {
            return false;
        }

        const response: Response = await fetch(`${viteConfiguration.API_URL}users/logout`, {
            method: "get",
            headers: {...headers, authorization: token},
        });

        if (!response.ok) {
            console.error(response);

            return false;
        }

        return true;
    }

    /**
     * Handles adding an order item to the cart of the current user. Requires a valid token.
     *
     * @returns Current number of order items in the cart when successful, otherwise `false`.
     * @returns Current number of order items in the shoppingCart when successful, otherwise `false`.
     */
    public async addOrderItemToCart(id: number): Promise<number | undefined> {
        const token: string | undefined = this._tokenService.getToken();

        if (!token) {
            return undefined;
        }

        const response: Response = await fetch(`${viteConfiguration.API_URL}users/cart/${id}`, {
            method: "post",
            headers: {...headers, authorization: token},
        });

        if (!response.ok) {
            console.error(response);

            return undefined;
        }

        return (await response.json()) as number;
    }

    private async sendEmail(email: Email): Promise<void> {
        await api.sendEmail(email);
    }
}
