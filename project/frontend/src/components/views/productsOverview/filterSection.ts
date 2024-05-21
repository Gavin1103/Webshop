import { html, LitElement, TemplateResult } from "lit";
import {customElement, property} from "lit/decorators.js";
import filterSectionStyle from "../../../styles/productsOverview/filterSectionStyle";
import {FilterRequest} from "../../../types/overviewPage/FilterRequest";

interface ToggleableElement {
    visible: boolean;
    iconSrc: string;
}

@customElement("filter-section")
export class FilterSection extends LitElement {
    @property({type: Array})
    public categoryList: {name: string}[] = [];

    public filterRequest: FilterRequest | undefined;

    public filter: ToggleableElement = {
        visible: false,
        iconSrc: "/assets/image/icons/minus-circle.svg"
    };

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


    public toggleVisibility(element: ToggleableElement): void {
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

        this.filterRequest = filterRequest;
        sessionStorage.setItem("filterRequest", JSON.stringify(this.filterRequest));

        this.dispatchFilterChangedEvent(this.filterRequest);

        this.requestUpdate();
    }


    // Let filters retain state
    public firstUpdated(): void {
        this.updateFilter();
        if (this.filterRequest) {
            this.dispatchFilterChangedEvent(this.filterRequest);
        }
    }

    public clearFilter(): void {
        // Clear all category selections
        const allCategoryCheckboxes: NodeListOf<HTMLInputElement> = this.shadowRoot!.querySelectorAll(".category-checkbox input[type='checkbox']");
        allCategoryCheckboxes.forEach(checkbox => {
            checkbox.checked = false;
        });

        // Clear price range selections
        const lowestPriceInput: HTMLInputElement | null = this.shadowRoot!.querySelector("input[name='lowestPrice']");
        const highestPriceInput: HTMLInputElement | null = this.shadowRoot!.querySelector("input[name='highestPrice']");
        if (lowestPriceInput && highestPriceInput) {
            lowestPriceInput.value = "";
            highestPriceInput.value = "";
        }

        // Clear rating selections
        const allRatingInputs: NodeListOf<HTMLInputElement> = this.shadowRoot!.querySelectorAll(".rating-stars input[type='radio']");
        allRatingInputs.forEach(input => {
            input.checked = false;
        });
        this.requestUpdate();
    }

    public updateFilter(): void {
        // Check sessionStorage for stored filter request
        const storedFilterRequest: string | null = sessionStorage.getItem("filterRequest");
        console.log(storedFilterRequest);
        if (storedFilterRequest) {
            // Apply stored filter request
            this.filterRequest = JSON.parse(storedFilterRequest);

            if (this.filterRequest) {
                // Apply category filter
                if (this.filterRequest.categories && this.filterRequest.categories.length > 0) {
                    this.filterRequest.categories.forEach(category => {
                        const checkbox: HTMLInputElement = this.shadowRoot!.querySelector(`input[name='${category}']`) as HTMLInputElement;
                        if (checkbox) {
                            checkbox.checked = true;
                        }
                    });
                }

                // Apply price filter
                if (this.filterRequest.priceRange) {
                    const { min, max } = this.filterRequest.priceRange;
                    const lowestPriceInput: HTMLInputElement | null = this.shadowRoot!.querySelector("input[name='lowestPrice']");
                    const highestPriceInput: HTMLInputElement | null = this.shadowRoot!.querySelector("input[name='highestPrice']");
                    if (lowestPriceInput && highestPriceInput) {
                        lowestPriceInput.value = min.toString();
                        highestPriceInput.value = max.toString();
                    }
                }

                // Apply rating filter
                if (this.filterRequest.ratings) {
                    const ratingInput: HTMLInputElement | null = this.shadowRoot!.querySelector(`input[id='${this.filterRequest.ratings}']`);
                    if (ratingInput) {
                        ratingInput.checked = true;
                    }
                }
            }
        }

        this.requestUpdate();
    }


    private dispatchFilterChangedEvent(filterRequest: FilterRequest): void {
        const event: CustomEvent<{message: FilterRequest}> = new CustomEvent("filter-changed", {
            detail: { message: filterRequest },
            bubbles: true,
            composed: true
        });
        this.dispatchEvent(event);
    }

    public static styles = [filterSectionStyle];

    public render(): TemplateResult {
        return html`
            <section class="filter-section" style="${this.filter.visible ? "" : "display: none;"}">
                <img class="close-button" @click="${() : void => this.toggleVisibility(this.filter)}" src="/assets/image/icons/close-icon.svg" alt="close" />
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
