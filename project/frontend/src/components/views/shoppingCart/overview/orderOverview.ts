import {html, LitElement, TemplateResult} from "lit";
import {customElement, property} from "lit/decorators.js";
import {OrderItem} from "../../../../types/OrderItem";
import OrderInfoStyle from "../../../../styles/shoppingCart/orderInfo/orderInfoStyle";

@customElement("order-overview")
export class OrderOverview extends LitElement {
    public static styles = [OrderInfoStyle];

    @property({type: Object})
    private products!: OrderItem[];

    protected render(): TemplateResult {
        return html`
            <div class="order-info-wrapper">
                <div class="order-items">
                    ${this.products.map(product => html`
                        <cart-item .showControls="${false}" .product=${product}></cart-item>`)}
                </div>
                <div class="order-summary">
                    <order-summary .isOverviewPage="${true}" .products=${this.products}></order-summary>
                </div>
            </div>
        `;
    }
}
