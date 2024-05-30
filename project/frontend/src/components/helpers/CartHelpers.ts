import {itemType} from "../../enums/itemTypeEnum";

export interface CartItem {
    id: number;
    name: string;
    quantity: number;
    price: number;
    type: itemType;
    imageSrc: string;
}

export class CartManager {
    private static instance: CartManager;
    private items: CartItem[];

    private constructor() {
        this.items = this.getCartFromStorage();
    }


    public static getInstance(): CartManager {
        if (!CartManager.instance) {
            CartManager.instance = new CartManager();
        }
        return CartManager.instance;
    }

    private getCartFromStorage(): CartItem[] {
        const cart: string = localStorage.getItem("cart") as string;
        return cart ? JSON.parse(cart) : [];
    }

    public getCart(): CartItem[] {
        return this.items;
    }

    public addItem(item: CartItem): void {
        const index: number = this.items.findIndex(cartItem => cartItem.id === item.id);
        if (index > -1) {
            this.items[index].quantity += item.quantity;
        } else {
            this.items.push(item);
        }
        this.saveCart();
    }

    public updateItemQuantity(id: number, quantity: number): void {
        const index: number = this.items.findIndex(item => item.id === id);
        if (index > -1 && quantity > 0) {
            this.items[index].quantity = quantity;
            this.saveCart();
        } else if (quantity === 0) {
            this.removeItem(id);
        }
    }

    public removeItem(id: number): void {
        this.items = this.items.filter(item => item.id !== id);
        this.saveCart();
    }

    private saveCart(): void {
        localStorage.setItem("cart", JSON.stringify(this.items));
    }
}
