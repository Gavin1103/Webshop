import {html, LitElement, TemplateResult} from "lit";
import {customElement, property} from "lit/decorators.js";
import productCarouselSectionStyle from "../styles/productCarouselSectionStyle";

@customElement("product-carousel-section")
export class ProductCarouselSection extends LitElement {
    @property({type: String})
    public title: string = "";

    @property({type: Array})
    public productsData : {image: string, name: string, price: number}[] = [];

    public static styles = [productCarouselSectionStyle];

    public render(): TemplateResult {
        return html`
            <div class="header-container">
                <span class="title">${this.title}</span>
                <div class="header-actions">
                    <span class="action-text">See More</span>
                    <img class="action-icon" src="/assets/image/icons/chevron-right.svg" alt="see more">
                </div>
            </div>
            
            <section class="product-carousel">
                ${this.productsData.map(product => html`
                    <div class="product-card">
                        <img class="product-image" src="${product.image}" alt="${product.name}">
                        <div class="product-info">
                            <span class="product-name">${product.name}</span>
                            <span class="product-price">$${product.price}</span>
                            <img class="add-to-cart-button" src="/assets/image/icons/shopping-bag.svg" alt="add to cart">
                        </div>
                    </div>
                `)}
                </div>
            </section>
        `;
    }
}