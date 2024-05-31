import {CartService} from "../../services/CartService";
import {TokenService} from "../../services/TokenService";
import {Cart, ProductItem} from "../../interfaces/Cart";


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
            const cart = await this.cartService.getOrCreateCartForCurrentUser();
            this.items = cart.cartItems;
            this.cartId = cart.cartId;
            this.userId = cart.userId;
        }
    }

    private async createOrUpdateCart(): Promise<void> {
        if (this.cartId !== null && this.userId !== null) {
            const updateCart: Cart = {cartId: this.cartId, cartItems: this.items, userId: this.userId};

            const updatedCart = await this.cartService.updateCart(updateCart);
            this.items = updatedCart.cartItems;
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
            await this.createOrUpdateCart();
        } else {

            this.saveCart();
        }
    }

    public async updateItemQuantity(id: number, quantity: number): Promise<void> {
        if (this.isUserLoggedIn()) {
            this.items = this.items.map(item =>
                item.productId === id ? {...item, quantity, totalPrice: item.unitPrice * quantity} : item
            );

            await this.createOrUpdateCart();
        } else {
            const index: number = this.items.findIndex(item => item.productId === id);
            if (index > -1 && quantity > 0) {
                this.items[index].quantity = quantity;
                this.items[index].totalPrice = this.items[index].unitPrice * quantity;
                this.saveCart();
            } else if (quantity === 0) {
                await this.removeItem(id);
            }
        }
    }

    public async removeItem(id: number): Promise<void> {
        if (this.isUserLoggedIn()) {
            this.items = this.items.filter(item => item.productId !== id);
            await this.createOrUpdateCart();
        } else {
            this.items = this.items.filter(item => item.productId !== id);
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
            const cart = await this.cartService.getOrCreateCartForCurrentUser();
            this.items = cart.cartItems;
            this.cartId = cart.cartId;
            this.userId = cart.userId;
            return cart;
        }
        return this.items;
    }

    private saveCart(): void {
        localStorage.setItem("cart", JSON.stringify(this.items));
    }
}
