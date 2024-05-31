import {Cart, ProductItem} from "../../interfaces/Cart";

export function roundToTwoDecimals(number: number): string {
    return (Math.round(number * 100) / 100).toFixed(2);
}

export function mapCartItems(cart: Cart): ProductItem[] {
    if (!cart.cartItems || !Array.isArray(cart.cartItems)) {
        return [];
    }

    return cart.cartItems.map(item => ({
        productId: item.productId,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        totalPrice: item.totalPrice
    }));
}