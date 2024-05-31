import {html, LitElement, TemplateResult} from "lit";
import {customElement, property} from "lit/decorators.js";
import productCarouselSectionStyle from "../../../styles/homePage/productCarouselSectionStyle";
import {CartManager} from "../../helpers/CartHelpers";
import {ProductPreviewResponse} from "../../../types/ProductPreviewResponse";
import {navigateTo} from "../../router";
import {ProductItem} from "../../../interfaces/Cart";

@customElement("product-carousel-section")
export class ProductCarouselSection extends LitElement {
    @property({type: String})
    public title: string = "";

    @property({type: Array})
    public productsData: ProductPreviewResponse[] = [];

    public static styles = [productCarouselSectionStyle];

    public connectedCallback(): void {
        super.connectedCallback();
    }

    public async addItemToCart(product: ProductPreviewResponse): Promise<void> {
        const cartManager = CartManager.getInstance();

        const newItem: ProductItem = {
            productId: product.id,
            quantity: 1,
            unitPrice: product.price,
            totalPrice: product.price
        };
        await cartManager.addItem(newItem);
        this.redirectToCart();
    }


    public redirectToDetailPage(productId: number): void {
        navigateTo(`/product-detail-page/${productId}`)
    }

    private redirectToCart(): void {
        navigateTo("/cart")
    }

    public render(): TemplateResult {
        return html`
            <div class="header-container">
                <span class="title">${this.title}</span>
                <div class="header-actions">
                    <span tabindex="1" class="action-text">See More</span>
                    <img class="action-icon" src="/assets/image/icons/chevron-right.svg" alt="see more">
                </div>
            </div>

            <section class="product-carousel">
                ${this.productsData ? this.productsData.map(product => html`
                    <div class="product-card" tabindex="1">
                        <img class="product-image" @click=${() => this.redirectToDetailPage(product.id)}
                             src="${product.image}" alt="${product.name}">
                        <div class="product-info">
                            <span class="product-name">${product.name}</span>
                            <span class="product-price">$${product.price}</span>
                            <img tabindex="1"
                                 @click="${async (): Promise<void> => await this.addItemToCart(product)}"
                                 class="add-to-cart-button"
                                 src="/assets/image/icons/shopping-bag.svg" alt="add to cart">
                        </div>
                    </div>
                `) : ""}
                </div>
            </section>
        `;
    }
}