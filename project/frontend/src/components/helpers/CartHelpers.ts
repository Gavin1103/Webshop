import {CartService} from "../../services/CartService";
import {TokenService} from "../../services/TokenService";
import {Cart, ProductItem} from "../../interfaces/Cart";


export class CartManager {
    private static instance: CartManager;
    private items: ProductItem[];
    private cartService: CartService;
    private tokenService: TokenService;

    private constructor() {
        this.items = this.getCartFromStorage();
        this.cartService = new CartService();
        this.tokenService = new TokenService();
    }


    public static getInstance(): CartManager {
        if (!CartManager.instance) {
            CartManager.instance = new CartManager();
        }
        return CartManager.instance;
    }

    private async createOrUpdateCart(updateCart: Cart): Promise<void> {
        await this.getCart();
        await this.cartService.updateCart(updateCart);
    }

    public async addItem(item: ProductItem): Promise<void> {
        if (this.isUserLoggedIn()) {
            const updateCart: Cart = {cartItems: [...this.items, item]} as Cart;
            await this.createOrUpdateCart(updateCart);
        } else {
            const index: number = this.items.findIndex(cartItem => cartItem.productId === item.productId);
            if (index > -1) {
                this.items[index].quantity += item.quantity;
            } else {
                this.items.push(item);
            }
            this.saveCart();
        }
    }

    public async updateItemQuantity(id: number, quantity: number): Promise<void> {
        if (this.isUserLoggedIn()) {
            const updatedItems: ProductItem[] = this.items.map(item =>
                item.productId === id ? {...item, quantity} : item
            );
            const updateCart: Cart = {cartItems: updatedItems} as Cart;
            await this.createOrUpdateCart(updateCart);
        } else {
            const index: number = this.items.findIndex(item => item.productId === id);
            if (index > -1 && quantity > 0) {
                this.items[index].quantity = quantity;
                this.saveCart();
            } else if (quantity === 0) {
                await this.removeItem(id);
            }
        }
    }

    public async removeItem(id: number): Promise<void> {
        if (this.isUserLoggedIn()) {
            const updatedItems: ProductItem[] = this.items.filter(item => item.productId !== id);
            const updateCart: Cart = {cartItems: updatedItems} as Cart;
            await this.createOrUpdateCart(updateCart);
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

    public async getCart(): Promise<ProductItem[] | Cart> {
        if (this.isUserLoggedIn()) {
            return await this.cartService.getOrCreateCartForCurrentUser()
        }
        return this.items;
    }

    private saveCart(): void {
        localStorage.setItem("cart", JSON.stringify(this.items));
    }
}
