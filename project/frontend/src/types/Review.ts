import { UserReviewInfo } from "./UserReviewInfo";
import { Product } from "./product/Product";

export type Review = {
    reviewId: number;
    rating: number;
    review: string;
    createdAt: Date;
    updatedAt: Date;
    product: Product;
    user: UserReviewInfo;
}
