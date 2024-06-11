import {html, LitElement, TemplateResult} from "lit";
import {customElement, property} from "lit/decorators.js";
import showcaseSectionStyle from "../../../styles/productsOverview/showcaseSectionStyle";
import {FilterRequest} from "../../../types/overviewPage/FilterRequest";
import {ProductOverviewResponse} from "../../../types/product/ProductOverviewResponse";
import {Router} from "@vaadin/router";
import {CartItem, CartManager} from "../../helpers/CartHelpers";
import {itemType} from "../../../enums/itemTypeEnum";
import {navigateTo} from "../../router";

@customElement("showcase-section")
export class ShowcaseSection extends LitElement {

    public static styles = [showcaseSectionStyle];

    @property({type: String})
    public header: string | undefined;

    @property({type: String})
    public subHeader: string | undefined;

    @property({type: String})
    private productList: ProductOverviewResponse[] | undefined;

    private filterRequest: FilterRequest | undefined;

    private deleteButtonPath: string = "/assets/image/icons/close-icon.svg";

    public items: CartItem[] = [];

    private capitalizeFirstLetter(str: string | undefined): string | undefined{
        if (!str) {
            return undefined
        }

        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    public updateFilterRequest(filterRequest: FilterRequest | undefined): void {
        this.filterRequest = filterRequest;
        this.requestUpdate();
    }

    private updateSessionStorage(): void {
        if (this.filterRequest) {
            sessionStorage.setItem("filterRequest", JSON.stringify(this.filterRequest));
        } else {
            sessionStorage.removeItem("filterRequest");
        }
    }

    private dispatchFilterDeletedEvent(): void {
        const event: CustomEvent = new CustomEvent("filter-deleted", {
            bubbles: true,
            composed: true
        });
        this.dispatchEvent(event);
    }

    public redirectToDetailPage(productId:number):void{
        navigateTo(`/product-detail-page/${productId}`)
    }

    public loadItems(): void {
        this.items = CartManager.getCart();
    }

    public addItemToCart(product: ProductOverviewResponse): void {
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

    private redirectToCart(): void {
        Router.go(`cart`);
    }


    private renderCategories(): TemplateResult {
        return html`
      ${this.filterRequest?.categories?.map(
            (category: string) => html`
                <span class="category-filter-result result">
                    ${category}
                    <img src="${this.deleteButtonPath}" @click="${(): void => this.handleDeleteCategory(category)}" alt="delete">
                </span>`
        )}
    `;
    }

    private renderPriceRange(): TemplateResult {
        const priceRange: {min: number, max: number} | undefined = this.filterRequest?.priceRange;
        if (priceRange){
            return html`<span class="priceRange-filter-result result">
                ${priceRange.min} to ${priceRange.max} euros
                <img src="${this.deleteButtonPath}" @click="${this.handleDeletePriceRange}" alt="delete">
            </span>`;
        }
        return html``;
    }

    public renderRatings(): TemplateResult  {
        const rating: number | undefined = this.filterRequest?.ratings;
        if (rating) {
            return html `
            <span class="rating-filter-result result">
                ${this.filterRequest?.ratings} Star
                <img src="${this.deleteButtonPath}" @click="${this.handleDeleteRating}" alt="delete">
            </span>
        `;
        }
        return html ``;
    }

    private generateStars(rating: number): string {
        const roundedRating: number = Math.round(rating);
        const fullStar: string = "★";
        const emptyStar: string = "☆";
        const maxRating: number = 5;
        let stars: string = "";

        for (let i: number = 0; i < maxRating; i++) {
            stars += i < roundedRating ? fullStar : emptyStar;
        }

        return stars;
    }


    private handleDeleteCategory(category: string): void {
        if (this.filterRequest?.categories) {
            this.filterRequest.categories = this.filterRequest.categories.filter(cat => cat !== category);
            this.updateSessionStorage();
            this.dispatchFilterDeletedEvent();
            this.requestUpdate();
        }
    }

    private handleDeletePriceRange(): void {
        if (this.filterRequest) {
            delete this.filterRequest.priceRange;
            this.updateSessionStorage();
            this.dispatchFilterDeletedEvent();
            this.requestUpdate();
        }
    }

    private handleDeleteRating(): void {
        if (this.filterRequest) {
            delete this.filterRequest.ratings;
            this.updateSessionStorage();
            this.dispatchFilterDeletedEvent();
            this.requestUpdate();
        }
    }

    public calculateDiscount(product: ProductOverviewResponse): string | null {
        if (product.originalPrice <= product.currentPrice) {
            return null;
        }
        const discount: number = Math.floor(((product.originalPrice - product.currentPrice) / product.originalPrice) * 100);
        return "-" + discount + "%";
    }


    public render(): TemplateResult {
        return html`
            <div class="header">
                <span class="title">${this.capitalizeFirstLetter(this.header)}</span>
                <span class="sub-title">/${this.subHeader}</span>
            </div>
            <div class="filter-results">
                ${this.renderCategories()}
                ${this.renderPriceRange()}
                ${this.renderRatings()}
            </div>
            <section class="products-list-section">
                ${this.productList ? this.productList.map(product => html `
                    <div class="products-card">
                        <img @click="${() => this.redirectToDetailPage(product.id)}" class="product-image" src="${product.image}" alt="image">
                        <div class="product-info">
                            <div class="info-left">
                                <div class="info-top">
                                    <span class="name" @click="${() => this.redirectToDetailPage(product.id)}">${product.name}</span>
                                    ${this.calculateDiscount(product) ? html `
                                <span class="discount">${this.calculateDiscount(product)}</span>
                            ` : ""}
                                </div>
                                <san class="rating">${this.generateStars(product.averageRating)} (${product.averageRating})</san>
                                <span class="description">${product.description}</span>
                            </div>
                            
                            <div class="info-right">
                                <div class="price">
                                    ${this.calculateDiscount(product) ? html `
                                    <span class="original-price">
                                    ${product.originalPrice}
                                    </span>
                                ` : ""}
                                    <span class="current-price">
                                    €${product.currentPrice}
                                </span>
                                </div>
                                <img @click="${(): void => this.addItemToCart(product)}" class="cart-button" src="/assets/image/icons/shopping-bag.svg"/ alt="add to cart">
                            </div>
                        </div>
                    </div>
                `) : ""}

                
                
            </section>
        `;
    }
}