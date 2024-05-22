import {html, LitElement, TemplateResult} from "lit";
import {customElement, property} from "lit/decorators.js";
import OrderInfoStyle from "../../../../styles/shoppingCart/orderInfo/orderInfoStyle";
import {CartItem, CartManager} from "../../../helpers/CartHelpers";

@customElement("order-info")
export class OrderInfo extends LitElement {
    public static styles = [OrderInfoStyle];

    @property({type: Object})
    private products!: CartItem[];

    public connectedCallback(): void {
        super.connectedCallback();
        this.addEventListener("cart-updated", this.handleCartUpdated);
    }

    public disconnectedCallback(): void {
        super.disconnectedCallback();
        this.removeEventListener("cart-updated", this.handleCartUpdated);
    }

    private handleCartUpdated = (): void => {
        this.products = [...CartManager.getCart()];
    };

    protected render(): TemplateResult {
        return html`
            <div class="order-info-wrapper">
                <div class="order-items">
                    ${this.products.map(product => html`
                        <cart-list-item .product=${product}></cart-list-item>`)}
                </div>
                <div class="order-summary">
                    <order-summary .products=${this.products}></order-summary>
                </div>
            </div>
        `;
    }
}
