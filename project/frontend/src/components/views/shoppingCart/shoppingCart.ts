import {html, LitElement, TemplateResult} from "lit";
import {customElement, property, state} from "lit/decorators.js";
import shoppingCartStyle from "../../../styles/shoppingCart/shoppingCartStyle";
import {getCurrentPath} from "../../router";
import {CartManager} from "../../helpers/CartHelpers";
import {Cart, ProductItem} from "../../../interfaces/Cart";

@customElement("shopping-cart")
export class ShoppingCart extends LitElement {

    public static styles = [shoppingCartStyle];

    @state()
    private currentPath: string = "";

    @property({type: Array})
    private products: Cart | ProductItem[] = [];

    public connectedCallback(): void {
        super.connectedCallback();
        this.updateCurrentPath();
        void this.loadProducts();
        this.addEventListener("cart-updated", this.handleCartUpdated);
        this.requestUpdate();
    }

    public disconnectedCallback(): void {
        super.disconnectedCallback();
        this.removeEventListener("cart-updated", this.handleCartUpdated);
    }

    private handleCartUpdated = (): void => {
        void this.loadProducts();
        this.requestUpdate();
    }

    private async loadProducts(): Promise<void> {
        const cartManager = CartManager.getInstance();
        this.products = await cartManager.getCart();
    }

    private updateCurrentPath = (): void => {
        this.currentPath = getCurrentPath();
        this.requestUpdate();
    };

    public render(): TemplateResult {
        return html`
            <div class="container">
                <wizard-container></wizard-container>

                ${this.currentPath === "/cart" ? html`
                    <order-info .products=${this.products}></order-info>
                ` : null}

                ${this.currentPath === "/cart/personal-info" ? html`
                    <personal-info></personal-info>
                ` : null}

                ${this.currentPath === "/cart/overview" ? html`
                    <order-overview .products=${this.products}></order-overview>
                ` : null}
            </div>
        `;
    }
}