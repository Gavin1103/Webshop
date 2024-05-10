import {html, LitElement, TemplateResult} from "lit";
import {customElement, property, state} from "lit/decorators.js";
import {itemType, OrderItem} from "../../../types/OrderItem";
import shoppingCartStyle from "../../../styles/shoppingCart/shopping-cart-style";

@customElement("shopping-cart")
export class ShoppingCart extends LitElement {

    public static styles = [shoppingCartStyle];

    @state()
    private currentPath: string = window.location.pathname;

    // TODO get shopping cart data from session storage.
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
            <div class="container">
                <wizard-container></wizard-container>

                ${this.currentPath === "/cart" ? html`
                    <order-info .products=${this.products}></order-info>
                ` : null}

                ${this.currentPath.startsWith("/cart/personal-info") ? html`
                    <personal-info></personal-info>
                ` : null}
            </div>
        `;
    }
}