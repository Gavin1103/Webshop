import {html, LitElement, TemplateResult} from "lit";
import {customElement, property} from "lit/decorators.js";
import showcaseSectionStyle from "../../../styles/productsOverview/showcaseSectionStyle";
import {FilterRequest} from "./type/FilterRequest";

@customElement("showcase-section")
export class ShowcaseSection extends LitElement {

    public static styles = [showcaseSectionStyle];

    @property({type: String})
    public overViewType: string | undefined;

    private filterRequest: FilterRequest | undefined;

    public updateFilterRequest(filterRequest: FilterRequest | undefined): void {
        this.filterRequest = filterRequest;
        this.requestUpdate();
    }


    private renderCategories(): TemplateResult {
        return html`
      ${this.filterRequest?.categories?.map(
            (category: string) => html`
                <span class="category-filter-result result">
                    ${category}
                </span>`
        )}
    `;
    }

    private renderPriceRange(): TemplateResult {
        const priceRange: {min: number, max: number} | undefined = this.filterRequest?.priceRange;
        if (priceRange){
            return html`<span class="priceRange-filter-result result">
                ${priceRange.min} to ${priceRange.max} euros
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
            </span>
        `;
        }
        return html ``;
    }


    public render(): TemplateResult {
        return html`
            <div class="header">
                <span class="title">${this.overViewType}</span>
                <span class="sub-title">/Game</span>
            </div>
            <div class="filter-results">
                ${this.renderCategories()}
                ${this.renderPriceRange()}
                ${this.renderRatings()}
            </div>
            <section class="products-list-section">
                <div class="products-card">
                    <img class="product-image" src="https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/digital_camera_photo-1080x675.jpg" alt="image">
                    <div class="product-info">
                        <div class="info-left">
                            <span class="name">Product</span>
                            <san class="rating">★★★★★</san>
                            <span class="description">This is a good product</span>
                        </div>
                        
                        <div class="info-right">
                            <span class="price">€ 19.99</span>
                            <button class="cart-button">Add</button>
                        </div>
                    </div>
                </div>

                
                
            </section>
        `;
    }
}