import {html, LitElement, TemplateResult} from "lit";
import {customElement, property} from "lit/decorators.js";
import OrderInfoStyle from "../../../../styles/shoppingCart/orderInfo/orderInfoStyle";
import {CartManager} from "../../../helpers/CartHelpers";
import {Cart, ProductItem} from "../../../../interfaces/Cart";
import {mapCartItems} from "../../../helpers/helpers";

@customElement("order-info")
export class OrderInfo extends LitElement {
    public static styles = [OrderInfoStyle];

    @property({type: Object})
    private products!: Cart;

    public connectedCallback(): void {
        super.connectedCallback();
        this.addEventListener("cart-updated", this.handleCartUpdated);
    }

    public disconnectedCallback(): void {
        super.disconnectedCallback();
        this.removeEventListener("cart-updated", this.handleCartUpdated);
    }

    private handleCartUpdated = (): void => {
        const cartManager = CartManager.getInstance();
        const cart: ProductItem[] | undefined = void cartManager.getCart();

        if (cart !== undefined) {
            this.products.cartItems = cart;
        }
    };

    protected render(): TemplateResult {
        const productItems: ProductItem[] = mapCartItems(this.products);

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
