export type FilterRequest = {
    categories?: string[];
    priceRange?: { min: number; max: number };
    ratings?: number;
}