import {html, LitElement, TemplateResult} from "lit";
import {customElement, property} from "lit/decorators.js";
import productCarouselSectionStyle from "../../../styles/homePage/productCarouselSectionStyle";
import {ProductPreviewResponse} from "../../../../types/responses/ProductPreviewResponse";
import {navigateTo} from "../../router";

@customElement("product-carousel-section")
export class ProductCarouselSection extends LitElement {
    @property({type: String})
    public title: string = "";

    @property({type: Array})
    public productsData: ProductPreviewResponse[] = [];

    private redirectToProductDetailPage(id: number): void {
        navigateTo(`productDetail/${id}`);
    }

    public static styles = [productCarouselSectionStyle];

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
                    <div class="product-card" tabindex="1"
                         @click="${(): void => this.redirectToProductDetailPage(product.id)}">
                        <img class="product-image" src="${product.image}" alt="${product.name}">
                        <div class="product-info">
                            <span class="product-name">${product.name}</span>
                            <span class="product-price">$${product.price}</span>
                            <img tabindex="1" class="add-to-cart-button"
                                 src="/assets/image/icons/shopping-bag.svg" alt="add to cart">
                        </div>
                    </div>
                `) : ""}
                </div>
            </section>
        `;
    }
}