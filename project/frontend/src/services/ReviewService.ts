import { Review } from "../types/Review";

export class ReviewService {
    public async getReviewById(reviewId: number): Promise<Review | undefined> {
        const response: Response = await fetch(`${viteConfiguration.API_URL}/reviews/${reviewId}`, {
            method: "get",
        });

        if (!response.ok) {
            console.error(response);

            return undefined;
        }

        return (await response.json()) as Review;
    }

    public async deleteReview(reviewId: number): Promise<void> {
        await fetch(`${viteConfiguration.API_URL}/reviews/delete/${reviewId}`, {
            method: "POST",
        });
    }
}
