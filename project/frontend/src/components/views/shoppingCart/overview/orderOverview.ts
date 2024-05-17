import {html, LitElement, TemplateResult} from "lit";
import {customElement, property} from "lit/decorators.js";
import OrderInfoStyle from "../../../../styles/shoppingCart/orderInfo/orderInfoStyle";
import {CartItem} from "../../../helpers/CartHelpers";

@customElement("order-overview")
export class OrderOverview extends LitElement {
    public static styles = [OrderInfoStyle];

    @property({type: Object})
    private products!: CartItem[];

    protected render(): TemplateResult {
        return html`
            <div class="order-info-wrapper">
                <div class="order-items">
                    ${this.products.map(product => html`
                        <cart-list-item .showControls="${false}" .product=${product}></cart-list-item>`)}
                </div>
                <div class="order-summary">
                    <order-overview-summary .products=${this.products}></order-overview-summary>
                </div>
            </div>
        `;
    }
}
