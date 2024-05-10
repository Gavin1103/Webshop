import {html, LitElement, TemplateResult} from "lit";
import {customElement, property} from "lit/decorators.js";
import {OrderItem} from "../../../../types/OrderItem";
import OrderInfoStyle from "../../../../styles/shoppingCart/orderInfo/order-info-style";

@customElement("order-info")
export class OrderInfo extends LitElement {
    public static styles = [OrderInfoStyle];

    @property({type: Object})
    private products!: OrderItem[];

    protected render(): TemplateResult {
        return html`
            <div class="order-info-wrapper">
                <div class="order-items">
                    ${this.products.map(product => html`
                        <cart-item .product=${product}></cart-item>`)}
                </div>
                <div class="order-summary">
                    <order-summary .products=${this.products}></order-summary>
                </div>
            </div>
        `;
    }
}
