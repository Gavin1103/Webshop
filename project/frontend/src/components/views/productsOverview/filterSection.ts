import { html, LitElement, TemplateResult } from "lit";
import {customElement, property} from "lit/decorators.js";
import filterSectionStyle from "../../../styles/productsOverview/filterSectionStyle";
import {FilterRequest} from "./type/FilterRequest";

interface ToggleableElement {
    visible: boolean;
    iconSrc: string;
}

@customElement("filter-section")
export class FilterSection extends LitElement {
    public static events = {
        "filter-changed": { type: CustomEvent<FilterRequest> }
    };

    @property({type: Array})
    public categoryList: {name: string}[] = [];

    private category: ToggleableElement = {
        visible: true,
        iconSrc: "/assets/image/icons/minus-circle.svg"
    };

    private priceRange: ToggleableElement = {
        visible: true,
        iconSrc: "/assets/image/icons/minus-circle.svg"
    };

    private rating: ToggleableElement = {
        visible: true,
        iconSrc: "/assets/image/icons/minus-circle.svg"
    };

    private toggleVisibility(element: ToggleableElement): void {
        element.visible = !element.visible;
        element.iconSrc = element.visible ? "/assets/image/icons/minus-circle.svg" : "/assets/image/icons/plus-circle.svg";
        this.requestUpdate();
    }

    //After the user selects the filter conditions, they will be automatically saved in the session.
    private generateFilterRequest(): void {
        const filterRequest: { [key: string]: any } = {};

        //Get the selected cate: example ["cate1", "cate2"]
        const selectedCategories: string[] = Array.from(this.shadowRoot!.querySelectorAll<HTMLInputElement>(".category-checkbox input[type='checkbox']:checked")).map((checkbox) => checkbox.name);
        if (selectedCategories.length > 0) {
            filterRequest["categories"] = selectedCategories;
        }

        // Get the lowestPrice and highestPrice: example [min: 1, max: 100]
        const lowestPriceInput: HTMLInputElement = this.shadowRoot!.querySelector("input[name='lowestPrice']") as HTMLInputElement;
        const highestPriceInput: HTMLInputElement = this.shadowRoot!.querySelector("input[name='highestPrice']") as HTMLInputElement;
        const minPrice: number = parseFloat(lowestPriceInput.value);
        const maxPrice: number = parseFloat(highestPriceInput.value);
        if (!isNaN(minPrice) && !isNaN(maxPrice)) {
            filterRequest["priceRange"] = { min: minPrice, max: maxPrice };
        }

        // Get the selected ratings: example [rating : 1]
        const checkedRatingInputs: NodeListOf<HTMLInputElement> = this.shadowRoot!.querySelectorAll<HTMLInputElement>(".rating-stars input[type='radio']:checked");
        const selectedRatings: number[] = Array.from(checkedRatingInputs).map((input) => parseInt(input.id));
        if (selectedRatings.length > 0) {
            filterRequest["ratings"] = selectedRatings[0];
        }

        sessionStorage.setItem("filterRequest", JSON.stringify(filterRequest));

        const event: CustomEvent<{message: FilterRequest}>  = new CustomEvent("filter-changed", {
            detail: { message: filterRequest },
            bubbles: true,
            composed: true
        });
        this.dispatchEvent(event);

        this.requestUpdate();
    }


    // Let filters retain state
    public firstUpdated(): void {
        // Check sessionStorage for stored filter request
        const storedFilterRequest: string | null = sessionStorage.getItem("filterRequest");
        if (storedFilterRequest) {
            // Apply stored filter request
            const filterRequest: FilterRequest = JSON.parse(storedFilterRequest);

            // Apply category filter
            if (filterRequest.categories && filterRequest.categories.length > 0) {
                filterRequest.categories.forEach(category => {
                    const checkbox: HTMLInputElement = this.shadowRoot!.querySelector(`input[name='${category}']`) as HTMLInputElement;
                    if (checkbox) {
                        checkbox.checked = true;
                    }
                });
            }

            // Apply price filter
            if (filterRequest.priceRange) {
                const { min, max } = filterRequest.priceRange;
                const lowestPriceInput: HTMLInputElement | null = this.shadowRoot!.querySelector("input[name='lowestPrice']");
                const highestPriceInput: HTMLInputElement | null = this.shadowRoot!.querySelector("input[name='highestPrice']");
                if (lowestPriceInput && highestPriceInput) {
                    lowestPriceInput.value = min.toString();
                    highestPriceInput.value = max.toString();
                }
            }

            // Apply rating filter
            if (filterRequest.ratings) {
                const ratingInput: HTMLInputElement | null = this.shadowRoot!.querySelector(`input[id='${filterRequest.ratings}']`);
                if (ratingInput) {
                    ratingInput.checked = true;
                }
            }

            const event: CustomEvent<{message: FilterRequest}>  = new CustomEvent("filter-changed", {
                detail: { message: filterRequest },
                bubbles: true,
                composed: true
            });
            this.dispatchEvent(event);

        }
    }

    public static styles = [filterSectionStyle];

    public render(): TemplateResult {
        return html`
            <section class="filter-section">
                <div class="category filter-block">
                    <div class="filter-header">
                        <span class="title">Categories</span>
                        <img
                            tabindex="1"
                            @click="${() : void => this.toggleVisibility(this.category)}"
                            src="${this.category.iconSrc}" alt="Toggle category"
                        >
                    </div>
                    <ul class="category-checkbox" style="${this.category.visible ? "" : "display: none;"}">
                        ${this.categoryList.map((category, index) => html`
                            <li>
                                <input type="checkbox" id="category_${index}" name="${category.name}" @change="${this.generateFilterRequest}">
                                <label for="category_${index}">${category.name}</label>
                            </li>
                        `)}
                    </ul>
                </div>
                
                <div class="price-range filter-block">
                    <div class="filter-header">
                        <span class="title">Price Range</span>
                        <img
                            tabindex="1"
                            @click="${() : void => this.toggleVisibility(this.priceRange)}"
                            src="${this.priceRange.iconSrc}" alt="Toggle category"
                        >
                    </div>
                    <div class="price-input-button" style="${this.priceRange.visible ? "" : "display: none;"}">
                        <input type="number" name="lowestPrice">
                        <span class="price-separator">-</span>
                        <input type="number" name="highestPrice">
                        <img 
                            @click="${this.generateFilterRequest}"
                             class="go-button" 
                            src="/assets/image/icons/chevron-right.svg" 
                            alt="go"
                        >
                    </div>
                </div>

                
                <div class="rating filter-block">
                    <div class="filter-header">
                        <span class="title">Rating</span>
                        <img
                            tabindex="1"
                            @click="${(): void => this.toggleVisibility(this.rating)}"
                            src="${this.rating.iconSrc}" alt="Toggle rating"
                        >
                    </div>
                    <ul class="rating-stars" style="${this.rating.visible ? "" : "display: none;"}">
                        ${[0, 1, 2, 3, 4, 5].map((index) => html`
                            <li>
                                <input type="radio" name="rating" id="${index}" @change="${this.generateFilterRequest}" >
                                <label for="${index} star">${index === 0 ? "All rating" : "★".repeat(index)}</label>
                            </li>
                        `)}
                    <ul/>
                </div>
                
            </section>
        `;
    }
}
