import {itemType} from "../../enums/itemTypeEnum";
import {CartService} from "../../services/CartService";
import {TokenService} from "../../services/TokenService";
import {UpdateCart} from "../../interfaces/UpdateCart";

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

    private async createOrUpdateCart(updateCartDTO: UpdateCart): Promise<void> {
        await this.getCart();
        await this.cartService.updateCart(updateCartDTO);
    }

    public async addItem(item: CartItem): Promise<void> {
        if (this.isUserLoggedIn()) {
            const updateCart: UpdateCart = {items: [...this.items, item]};
            await this.createOrUpdateCart(updateCart);
        } else {
            const index: number = this.items.findIndex(cartItem => cartItem.id === item.id);
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
            const updatedItems: CartItem[] = this.items.map(item =>
                item.id === id ? {...item, quantity} : item
            );
            const updateCart: UpdateCart = {items: updatedItems};
            await this.createOrUpdateCart(updateCart);
        } else {
            const index: number = this.items.findIndex(item => item.id === id);
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
            const updatedItems: CartItem[] = this.items.filter(item => item.id !== id);
            const updateCart: UpdateCart = {items: updatedItems};
            await this.createOrUpdateCart(updateCart);
        } else {
            this.items = this.items.filter(item => item.id !== id);
            this.saveCart();
        }
    }


    private isUserLoggedIn(): boolean {
        const token: string | undefined = this.tokenService.getToken();

        return token !== undefined;
    }

    private getCartFromStorage(): CartItem[] {
        const cart: string = localStorage.getItem("cart") as string;
        return cart ? JSON.parse(cart) : [];
    }

    public async getCart(): Promise<CartItem[]> {
        if (this.isUserLoggedIn()) {
            return await this.cartService.getOrCreateCartForCurrentUser()
        }
        return this.items;
    }

    private saveCart(): void {
        localStorage.setItem("cart", JSON.stringify(this.items));
    }
}
