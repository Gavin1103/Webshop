import { Review } from "../types/Review";
import { TokenService } from "./TokenService";

export class ReviewService {
    private _tokenService: TokenService = new TokenService();

    public async getReviewById(reviewId: number): Promise<Review | undefined> {
        const response: Response = await fetch(`${viteConfiguration.API_URL}/reviews/getBy/${reviewId}`, {
            method: "get",
        });

        if (!response.ok) {
            console.error(response);

            return undefined;
        }

        return (await response.json()) as Review;
    }

    public async deleteReview(reviewId: number): Promise<void> {
        const token: string | undefined = this._tokenService.getToken();
        await fetch(`${viteConfiguration.API_URL}/reviews/delete/${reviewId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
            },
        });
    }
}
