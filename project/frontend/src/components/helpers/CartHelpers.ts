import { CartService } from "../../services/CartService";
import { TokenService } from "../../services/TokenService";
import { Cart, ProductItem } from "../../interfaces/Cart";

export class CartManager {
    private static instance: CartManager;
    private items: ProductItem[];
    private cartService: CartService;
    private tokenService: TokenService;
    private cartId: number | null = null;
    private userId: number | null = null;

    private constructor() {
        this.items = this.getCartFromStorage();
        this.cartService = new CartService();
        this.tokenService = new TokenService();
        void this.initializeCart();
    }

    public static getInstance(): CartManager {
        if (!CartManager.instance) {
            CartManager.instance = new CartManager();
        }
        return CartManager.instance;
    }

    private async initializeCart(): Promise<void> {
        if (this.isUserLoggedIn()) {
            try {
                const cart = await this.cartService.getOrCreateCartForCurrentUser();
                this.items = cart.cartItems;
                this.cartId = cart.cartId;
                this.userId = cart.userId;
            } catch (error) {
                console.error("Error initializing cart from server:", error);
                this.resetToLocalStorage();
            }
        }
    }

    private async createOrUpdateCart(): Promise<void> {
        if (this.cartId !== null && this.userId !== null) {
            const updateCart: Cart = { cartId: this.cartId, cartItems: this.items, userId: this.userId };

            try {
                const updatedCart = await this.cartService.updateCart(updateCart);
                this.items = updatedCart.cartItems;
            } catch (error) {
                console.error("Error updating cart on server:", error);
                this.resetToLocalStorage();
            }
        } else {
            this.saveCart();
        }
    }

    public async addItem(item: ProductItem): Promise<void> {
        const index: number = this.items.findIndex(cartItem => cartItem.productId === item.productId);
        if (index > -1) {
            this.items[index].quantity += item.quantity;
            this.items[index].totalPrice += item.totalPrice;
        } else {
            this.items.push(item);
        }

        if (this.isUserLoggedIn()) {
            try {
                await this.createOrUpdateCart();
            } catch (error) {
                console.error("Error adding item to server cart:", error);
                this.resetToLocalStorage();
            }
        } else {
            this.saveCart();
        }
    }

    public async updateItemQuantity(id: number, quantity: number): Promise<void> {
        const index: number = this.items.findIndex(item => item.productId === id);
        if (index > -1) {
            this.items[index].quantity = quantity;
            this.items[index].totalPrice = this.items[index].unitPrice * quantity;

            if (quantity === 0) {
                this.items.splice(index, 1);
            }
        }

        if (this.isUserLoggedIn()) {
            try {
                await this.createOrUpdateCart();
            } catch (error) {
                console.error("Error updating item quantity on server cart:", error);
                this.resetToLocalStorage();
            }
        } else {
            this.saveCart();
        }
    }

    public async removeItem(id: number): Promise<void> {
        this.items = this.items.filter(item => item.productId !== id);

        if (this.isUserLoggedIn()) {
            try {
                await this.createOrUpdateCart();
            } catch (error) {
                console.error("Error removing item from server cart:", error);
                this.resetToLocalStorage();
            }
        } else {
            this.saveCart();
        }
    }

    private isUserLoggedIn(): boolean {
        const token: string | undefined = this.tokenService.getToken();
        return token !== undefined;
    }

    private getCartFromStorage(): ProductItem[] {
        const cart: string = localStorage.getItem("cart") as string;
        return cart ? JSON.parse(cart) : [];
    }

    public async getCart(): Promise<Cart | ProductItem[]> {
        if (this.isUserLoggedIn()) {
            try {
                const cart = await this.cartService.getOrCreateCartForCurrentUser();
                this.items = cart.cartItems;
                this.cartId = cart.cartId;
                this.userId = cart.userId;
                return cart;
            } catch (error) {
                console.error("Error getting cart from server:", error);
                this.resetToLocalStorage();
                return this.items;
            }
        }
        return this.items;
    }

    private saveCart(): void {
        try {
            localStorage.setItem("cart", JSON.stringify(this.items));
            console.log("Cart saved to local storage.");
        } catch (error) {
            console.error("Error saving cart to local storage:", error);
        }
    }

    private resetToLocalStorage(): void {
        this.cartId = null;
        this.userId = null;
        this.saveCart();
        console.log("Switched to using local storage for cart operations.");
    }
}
