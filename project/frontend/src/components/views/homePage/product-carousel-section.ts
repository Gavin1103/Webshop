import {html, LitElement, TemplateResult} from "lit";
import {customElement, property} from "lit/decorators.js";
import productCarouselSectionStyle from "../../../styles/homePage/productCarouselSectionStyle";
import {CartItem, CartManager} from "../../helpers/CartHelpers";
import {ProductPreviewResponse} from "../../../types/ProductPreviewResponse";
import {itemType} from "../../../enums/itemTypeEnum";
import {navigateTo} from "../../router";

@customElement("product-carousel-section")
export class ProductCarouselSection extends LitElement {
    @property({type: String})
    public title: string = "";

    @property({type: Array})
    public items: CartItem[] = [];

    @property({type: Array})
    public productsData: ProductPreviewResponse[] = [];

    @property({type: String})
    public redirectUrl: string | undefined;

    public static styles = [productCarouselSectionStyle];

    public connectedCallback(): void {
        super.connectedCallback();
        this.loadItems();
    }

    public loadItems(): void {
        this.items = CartManager.getCart();
    }

    public calculateDiscount(product: ProductPreviewResponse): string | null {
        if (product.originalPrice <= product.currentPrice) {
            return null;
        }
        const discount: number = Math.floor(((product.originalPrice - product.currentPrice) / product.originalPrice) * 100);
        return "-" + discount + "%";
    }

    public addItemToCart(product: ProductPreviewResponse): void {
        const newItem: CartItem = {
            id: product.id,
            name: product.name,
            quantity: 1,
            type: itemType.GAME,
            price: product.currentPrice,
            imageSrc: product.image
        };
        CartManager.addItem(newItem);
        this.loadItems();
        this.redirectToCart();
    }


    public redirectToDetailPage(productId:number):void{
        navigateTo(`/product-detail-page/${productId}`)
    }

    private redirectToCart(): void {
        navigateTo("/cart")
    }

    private redirectToSeeMore(): void {
        if (this.redirectUrl) {
            navigateTo(this.redirectUrl);
        }
    }

    public render(): TemplateResult {
        return html`
            <div class="header-container">
                <span class="title">${this.title}</span>
                <div  @click="${this.redirectToSeeMore}" class="header-actions">
                    <span tabindex="1" class="action-text">See More</span>
                    <img class="action-icon" src="/assets/image/icons/chevron-right.svg" alt="see more">
                </div>
            </div>

            <section class="product-carousel">
                ${this.productsData? this.productsData.map(product => html`
                    <div class="product-card" tabindex="1">
                        ${this.calculateDiscount(product) ? html `
                            <span class="discount">${this.calculateDiscount(product)}</span>
                        ` : ""}
                        <img class="product-image" @click=${() => this.redirectToDetailPage(product.id)} src="${product.image}" alt="${product.name}">
                        <div class="product-name">
                            <span>${product.name}</span>
                        </div>
                        <div class="product-price">
                            <span class="product-price-original">${this.calculateDiscount(product) ? "$ " + product.originalPrice : ""}</span>
                            <span class="product-price-current">$${product.currentPrice}</span>
                        </div>
                        <img tabindex="1" @click="${(): void => this.addItemToCart(product)}"
                             class="add-to-cart-button"
                             src="/assets/image/icons/shopping-bag.svg" alt="add to cart">
                    </div>
                `) : ""}
                </div>
            </section>
        `;
    }
}