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
    public static getCart(): CartItem[] {
        const cart: string = localStorage.getItem("cart") as string;
        return cart ? JSON.parse(cart) : [];
    }

    public static addItem(item: CartItem): void {
        const items: CartItem[] = CartManager.getCart();
        const index: number = items.findIndex(cartItem => cartItem.id === item.id);
        if (index > -1) {
            items[index].quantity += item.quantity;
        } else {
            items.push(item);
        }
        CartManager.saveCart(items);
    }

    public static updateItemQuantity(id: number, quantity: number): void {
        const items: CartItem[] = CartManager.getCart();
        const index: number = items.findIndex(item => item.id === id);
        if (index > -1 && quantity > 0) {
            items[index].quantity = quantity;
            CartManager.saveCart(items);
        } else if (quantity === 0) {
            CartManager.removeItem(id);
        }
    }

    public static removeItem(id: number): void {
        let items: CartItem[] = CartManager.getCart();
        items = items.filter(item => item.id !== id);
        CartManager.saveCart(items);
    }

    private static saveCart(items: CartItem[]): void {
        localStorage.setItem("cart", JSON.stringify(items));
    }
}
