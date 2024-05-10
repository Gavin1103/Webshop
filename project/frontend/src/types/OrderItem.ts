export interface OrderItem {
    id: number;
    name: string;
    type: itemType;
    description?: string;
    price: number;
    quantity: number;
    imageURLs?: string[];
};

export enum itemType {
    GAME = "Computer game",
    MERCH = "Merchandise",
    ACCESSOIRES = "Accessoires"
}