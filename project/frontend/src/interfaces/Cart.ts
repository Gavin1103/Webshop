export interface Cart {
    cartId: number;
    cartItems: ProductItem[];
    userId: number;
}

export interface ProductItem {
    productId: number;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
}
