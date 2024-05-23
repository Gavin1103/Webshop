/**
 * Handles token related functionality
 */
export class TokenService {
    /**
     * Store the current JWT token in local storage
     * 
     * @param token The current JWT token
     */
    public setToken(token: string): void {
        localStorage.setItem("token", token);
    }

    public setRefreshToken(token: string): void {
        localStorage.setItem("refresh_token", token);
    }

    /**
     * Retrieve the stored JWT token from local storage
     * 
     * @returns JWT token when successful, otherwise `undefined`.
     */
    public getToken(): string | undefined {
        return localStorage.getItem("token") || undefined;
    }

    public getRefreshToken(): string | undefined {
        return localStorage.getItem("refresh_token") || undefined;
    }

    /**
     * Remove the JWT token from local storage
     */
    public removeToken(): void {
        return localStorage.removeItem("token");
    }

    public removeRefreshToken(): void {
        return localStorage.removeItem("refresh_token");
    }


    public async isAdmin(): Promise<boolean> {
        const token: string | undefined = this.getToken();

        if(!token) {
            return false;
        }

        const response: Response = await fetch(`${viteConfiguration.API_URL}/auth/is-admin`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        });

        return !(!response.ok || response.status === 403);
    }
}