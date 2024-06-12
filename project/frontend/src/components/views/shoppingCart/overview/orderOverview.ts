import {html, LitElement, TemplateResult} from "lit";
import {customElement, property} from "lit/decorators.js";
import OrderInfoStyle from "../../../../styles/shoppingCart/orderInfo/orderInfoStyle";
import {Cart, ProductItem} from "../../../../interfaces/Cart";
import {mapCartItems} from "../../../helpers/helpers";

@customElement("order-overview")
export class OrderOverview extends LitElement {
    public static styles = [OrderInfoStyle];

    @property({type: Object})
    private products!: Cart;

    protected render(): TemplateResult {
        if (!this.products) {
            return html`<div class="order-info-wrapper">No products found</div>`;
        }
        const productItems: ProductItem[] = mapCartItems(this.products);

        return html`
            <div class="order-info-wrapper">
                <div class="order-items">
                    ${productItems.map(product => html`
                        <cart-list-item .showControls="${false}" .product=${product}></cart-list-item>`)}
                </div>
                <div class="order-summary">
                    <order-overview-summary .products=${this.products}></order-overview-summary>
                </div>
            </div>
        `;
    }
}
