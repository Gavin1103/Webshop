import {html, LitElement, TemplateResult} from "lit";
import {customElement, property} from "lit/decorators.js";
import CartItemStyle from "../../../../styles/shoppingCart/orderInfo/cartItemStyle";
import {CartItem, CartManager} from "../../../helpers/CartHelpers";
import {roundToTwoDecimals} from "../../../helpers/helpers";

@customElement("cart-list-item")
export class CartListItem extends LitElement {
    public static styles = [CartItemStyle];

    @property({type: Object})
    private product!: CartItem;

    @property({type: Boolean})
    public showControls: boolean = true;


    public increaseQuantity(): void {
        const cartManager = CartManager.getInstance();
        cartManager.updateItemQuantity(this.product.id, this.product.quantity + 1);
        this.dispatchEvent(new CustomEvent("cart-updated", {bubbles: true, composed: true}));
    }

    public decreaseQuantity(): void {
        const cartManager = CartManager.getInstance();

        if (this.product.quantity > 1) {
            cartManager.updateItemQuantity(this.product.id, this.product.quantity - 1);
        } else {
            cartManager.removeItem(this.product.id);
        }
        this.dispatchEvent(new CustomEvent("cart-updated", {bubbles: true, composed: true}));
    }

    public deleteItem(): void {
        const cartManager = CartManager.getInstance();

        cartManager.removeItem(this.product.id);
        this.dispatchEvent(new CustomEvent("cart-updated", {bubbles: true, composed: true}));
    }

    public render(): TemplateResult {
        return html`
            <div class="item-wrapper" id="${this.product.id}">
                <div class="container">
                    <div class="image">
                        <img src="${this.product.imageSrc}" alt="Order item image" class="image-item">
                    </div>
                    <div class="info">
                        <p class="title">${this.product.name}</p>
                        <p class="type">${this.product.type}</p>
                    </div>
                    <div class="quantity">
                        <h2>${this.product.quantity}</h2>
                        ${this.showControls ? html`
                            <div class="buttons">
                                <img @click=${this.increaseQuantity} src="/assets/image/icons/arrow-up.svg"
                                     alt="Button to increase item quantity">
                                <img @click=${this.decreaseQuantity} src="/assets/image/icons/arrow-down.svg"
                                     alt="Button to decrease item quantity">
                            </div>` : ""}
                    </div>
                    <div class="price">
                        <h4>€${roundToTwoDecimals(this.product.price * this.product.quantity)}</h4>
                    </div>
                    ${this.showControls ? html`
                        <div class="delete-button">
                            <img src="/assets/image/icons/delete-icon.svg" @click="${this.deleteItem}"
                                 alt="Clickable Delete Icon to Delete this item from the shopping cart">
                        </div>` : ""}
                </div>
            </div>
        `;
    }
}



