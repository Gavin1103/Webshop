import { Review } from "../Review";
import { Product } from "./Product";

export type ProductReviews = {
    product: Product;
    reviews: Review[];
}
