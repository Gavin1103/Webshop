import {html, LitElement, TemplateResult} from "lit";
import {customElement, property} from "lit/decorators.js";
import productCarouselSectionStyle from "../../../styles/homePage/productCarouselSectionStyle";
import {CartItem, CartManager} from "../../helpers/CartHelpers";

@customElement("product-carousel-section")
export class ProductCarouselSection extends LitElement {
    @property({type: String})
    public title: string = "";

    @property({type: Array})
    public items: CartItem[] = [];

    @property({type: Array})
    public productsData: CartItem[] = [];

    public static styles = [productCarouselSectionStyle];

    public connectedCallback(): void {
        super.connectedCallback();
        this.loadItems();
    }

    public loadItems(): void {
        this.items = CartManager.getCart();
        console.log(this.items);
    }

    public addItemToCart(product: CartItem): void {
        const newItem: CartItem = {
            id: product.id,
            name: product.name,
            quantity: 1,
            type: product.type,
            price: product.price,
            imageSrc: product.imageSrc
        };
        CartManager.addItem(newItem);
        this.loadItems();
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
                ${this.productsData.map(product => html`
                    <div class="product-card" tabindex="1">
                        <img class="product-image" src="${product.imageSrc}" alt="${product.name}">
                        <div class="product-info">
                            <span class="product-name">${product.name}</span>
                            <span class="product-price">$${product.price}</span>
                            <img tabindex="1" @click="${(): void => this.addItemToCart(product)}"
                                 class="add-to-cart-button"
                                 src="/assets/image/icons/shopping-bag.svg" alt="add to cart">
                        </div>
                    </div>
                `)}
                </div>
            </section>
        `;
    }
}