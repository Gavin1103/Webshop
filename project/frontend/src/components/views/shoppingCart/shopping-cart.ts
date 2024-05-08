import {html, LitElement, TemplateResult} from "lit";
import {customElement, property} from "lit/decorators.js";
import {itemType, OrderItem} from "../../../types/OrderItem";
import shoppingCartStyle from "../../../styles/shoppingCart/shopping-cart-style";

@customElement("shopping-cart")
export class ShoppingCart extends LitElement {

    public static styles = [shoppingCartStyle];

    @property({type: Array})
    private products: OrderItem[] = [
        {
            id: 1,
            name: "Epic Fantasy Game",
            type: itemType.GAME,
            description: "A strategy based computer game.",
            price: 59.99,
            quantity: 1,
            imageURLs: ["https://example.com/game.jpg"]
        },
        {
            id: 2,
            name: "Logo T-Shirt",
            type: itemType.MERCH,
            price: 29.99,
            quantity: 3,
            imageURLs: ["https://example.com/shirt1.jpg", "https://example.com/shirt2.jpg"]
        }
    ];


    public render(): TemplateResult {
        return html`
            <div>
                <h2>This is the Shopping cart</h2>
                <wizard-container></wizard-container>

                <div class="order-info-wrapper">
                    <div class="order-items">
                        ${this.products.map(product => html`
                            <cart-item .product=${product}></cart-item>`)}
                    </div>
                    <div class="order-summary">
                        <order-summary></order-summary>
                    </div>
                </div>

            </div>
        `;
    }
}