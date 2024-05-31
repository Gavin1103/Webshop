import {html, LitElement, TemplateResult} from "lit";
import {customElement, property} from "lit/decorators.js";
import OrderInfoStyle from "../../../../styles/shoppingCart/orderInfo/orderInfoStyle";
import {Cart, ProductItem} from "../../../../interfaces/Cart";
import {mapCartItems} from "../../../helpers/helpers";

@customElement("order-info")
export class OrderInfo extends LitElement {
    public static styles = [OrderInfoStyle];

    @property({type: Object})
    private products!: Cart | ProductItem[];

    private getProductItems(): ProductItem[] {
        return "cartItems" in this.products ? mapCartItems(this.products) : this.products;
    }

    protected render(): TemplateResult {
        const productItems = this.getProductItems();

        return html`
            <div class="order-info-wrapper">
                <div class="order-items">
                    ${productItems.map(product => html`
                        <cart-list-item .product=${product}></cart-list-item>`)}
                </div>
                <div class="order-summary">
                    <order-summary .products=${this.products}></order-summary>
                </div>
            </div>
        `;
    }
}
