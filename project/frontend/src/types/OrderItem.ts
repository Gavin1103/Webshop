import {itemType} from "../enums/itemTypeEnum";

export interface OrderItem {
    id: number;
    name: string;
    type: itemType;
    description?: string;
    price: number;
    quantity: number;
    imageURLs?: string[];
}