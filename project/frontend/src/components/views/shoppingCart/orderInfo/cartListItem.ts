import {html, LitElement, TemplateResult} from "lit";
import {customElement, property} from "lit/decorators.js";
import CartItemStyle from "../../../../styles/shoppingCart/orderInfo/cartItemStyle";
import {CartManager} from "../../../helpers/CartHelpers";
import {ProductItem} from "../../../../interfaces/Cart";
import {ProductService} from "../../../../services/ProductService";
import {roundToTwoDecimals} from "../../../helpers/helpers";
import {Product} from "../../../../types/product/Product";

@customElement("cart-list-item")
export class CartListItem extends LitElement {
    public static styles = [CartItemStyle];

    @property({type: Object})
    private product!: ProductItem;

    @property({type: Object})
    private productData!: Product;

    @property({type: Boolean})
    public showControls: boolean = true;

    public connectedCallback(): void {
        super.connectedCallback();
        void this.getProductData();
    }

    public async getProductData(): Promise<void> {
        const productService = new ProductService();
        this.productData = await productService.getProductById(this.product.productId) as Product;
    }

    public async increaseQuantity(): Promise<void> {
        const cartManager = CartManager.getInstance();

        await cartManager.updateItemQuantity(this.product.productId, this.product.quantity + 1);
        this.dispatchEvent(new CustomEvent("cart-updated", {bubbles: true, composed: true}));

        this.requestUpdate();
    }

    public async decreaseQuantity(): Promise<void> {
        const cartManager = CartManager.getInstance();

        if (this.product.quantity > 1) {
            await cartManager.updateItemQuantity(this.product.productId, this.product.quantity - 1);
        } else {
            await cartManager.removeItem(this.product.productId);
        }
        this.dispatchEvent(new CustomEvent("cart-updated", {bubbles: true, composed: true}));

        this.requestUpdate();
    }

    public async deleteItem(): Promise<void> {
        const cartManager = CartManager.getInstance();

        await cartManager.removeItem(this.product.productId);
        this.dispatchEvent(new CustomEvent("cart-updated", {bubbles: true, composed: true}));
        this.requestUpdate();
    }

    public render(): TemplateResult {
        if (!this.productData) return html`
            <div>Loading...</div>`;

        return html`
            <div class="item-wrapper" id="${this.product.productId}">
                <div class="container">
                    <div class="image">
                        <img src="${this.productData.image}" alt="Order item image" class="image-item">
                    </div>
                    <div class="info">
                        <p class="title">${this.productData.name}</p>
                        <p class="type">${this.productData.productCategory.name}</p>
                    </div>
                    <div class="quantity">
                        <h2>${this.product.quantity}</h2>
                        ${this.showControls ? html`
                            <div class="buttons">
                                <img @click=${this.increaseQuantity} src="/assets/image/icons/arrow-up.svg"
                                     alt="Button to increase item quantity">
                                <img @click=${this.decreaseQuantity} src="/assets/image/icons/arrow-down.svg"
                                     alt="Button to decrease item quantity">
                            </div>` : ""}
                    </div>
                    <div class="price">
                        <h4>€${roundToTwoDecimals(this.product.totalPrice)}</h4>
                    </div>
                    ${this.showControls ? html`
                        <div class="delete-button">
                            <img src="/assets/image/icons/delete-icon.svg" @click="${this.deleteItem}"
                                 alt="Clickable Delete Icon to Delete this item from the shopping cart">
                        </div>` : ""}
                </div>
            </div>
        `;
    }
}



