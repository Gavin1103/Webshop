import {html, LitElement, TemplateResult} from "lit";
import {customElement, property} from "lit/decorators.js";
import CartItemStyle from "../../../../styles/shoppingCart/orderInfo/cart-item-style";
import {OrderItem} from "../../../../types/OrderItem";

@customElement("cart-item")
export class CartItem extends LitElement {
    public static styles = [CartItemStyle];

    @property({type: Object})
    private product!: OrderItem;


    public increaseQuantity(): void {
        if (this.product.quantity >= 0 && this.product.quantity < 100) {
            this.product.quantity += 1;
            this.requestUpdate();
        }
    }

    public decreaseQuantity(): void {
        if (this.product.quantity > 0 && this.product.quantity < 100) {
            this.product.quantity -= 1;
            this.requestUpdate();
        }
    }


    public render(): TemplateResult {
        return html`
            <div class="item-wrapper" id="${this.product.id}">
                <div class="container">
                    <div class="image">
                        <img src="./assets/image/game1.png" alt="Order item image" class="image-item">
                    </div>
                    <div class="info">
                        <p class="title">${this.product.name}</p>
                        <p class="type">${this.product.type}</p>
                    </div>
                    <div class="quantity">
                        <h2>${this.product.quantity}</h2>
                        <div class="buttons">
                            <img @click=${this.increaseQuantity} src="./assets/image/icons/arrow-up.svg"
                                 alt="Button to increase item quantity">
                            <img @click=${this.decreaseQuantity} src="./assets/image/icons/arrow-down.svg"
                                 alt="Button to decrease item quantity">
                        </div>
                    </div>
                    <div class="price">
                        <h4>€${this.product.price * this.product.quantity}</h4>
                    </div>
                    <div class="delete-button">
                        <img src="./assets/image/icons/delete-icon.svg"
                             alt="Clickable Delete Icon to Delete this item from the shopping cart">
                    </div>
                </div>
            </div>
        `;
    }
}



