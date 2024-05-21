import {html, LitElement, TemplateResult} from "lit";
import {customElement} from "lit/decorators.js";
import overviewStyle from "../../../styles/productsOverview/overviewStyle";
import {Router} from "@vaadin/router";
import {getCurrentPath} from "../../router";
import {OverviewType} from "../../../enums/overviewPage/OverviewType";
import {FilterRequest} from "../../../types/overviewPage/FilterRequest";
import {ShowcaseSection} from "./showcaseSection";
import {ProductOverviewResponse} from "../../../types/responses/ProductOverviewResponse";
import {FilterSection} from "./filterSection";


@customElement("products-overview")
export class ProductsOverview extends LitElement {
    private categoryList: {name: string}[] = [
        {name: "Games"},
        {name: "Books"},
        {name: "Electronic"},
    ];

    private productList: ProductOverviewResponse[] = [
        {
            name: "Wireless Earbuds",
            description: "High-quality wireless earbuds with noise cancellation.",
            image: "https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/digital_camera_photo-1080x675.jpg",
            rating: 1.5,
            price: 19.99
        },
        {
            name: "Smart Watch",
            description: "A stylish smart watch with fitness tracking features.",
            image: "https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/digital_camera_photo-1080x675.jpg",
            rating: 2.4,
            price: 29.99
        },
        {
            name: "Gaming Laptop",
            description: "Powerful gaming laptop with the latest graphics card.",
            image: "https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/digital_camera_photo-1080x675.jpg",
            rating: 3.6,
            price: 39.99
        },
        {
            name: "Bluetooth Speaker",
            description: "Portable Bluetooth speaker with deep bass and long battery life.",
            image: "https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/digital_camera_photo-1080x675.jpg",
            rating: 4.2,
            price: 49.99
        },
        {
            name: "4K TV",
            description: "Ultra HD 4K TV with vibrant colors and smart features.",
            image: "https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/digital_camera_photo-1080x675.jpg",
            rating: 5,
            price: 59.99
        }
    ];

    private currentPath: string | undefined;
    // private param: string | undefined;

    public filterRequest: FilterRequest | undefined;


    public connectedCallback(): void {
        super.connectedCallback();
        this.updateCurrentPath();
        this.requestUpdate();
    }




    private updateCurrentPath = (): void => {
        const parts: string[] = getCurrentPath().split("/");
        const overviewType: OverviewType = parts[1] as OverviewType;
        switch (overviewType) {
            case OverviewType.category:
                this.currentPath = "Category";
        }
        // this.param = parts[2];
        this.requestUpdate();
    };


    private redirectToPreviousPage(): void {
        Router.go("/");
    }

    public showFilter(): void {
        const filter : FilterSection | undefined | Element | null = this.shadowRoot!.querySelector("filter-section");
        if (filter instanceof FilterSection) {
            filter.toggleVisibility(filter.filter);
        }
    }

    public static styles = [overviewStyle];


    public render():TemplateResult {
        return html`
            <div class="header">
                <div class="back">
                    <img src="/assets/image/icons/chevron-left.svg" alt="back">
                    <button @click="${this.redirectToPreviousPage}" class="header-back-button">Back</button>
                </div>
                <div class="filter">
                    <button @click="${this.showFilter}" class="header-filter-button">Filter <img src="/assets/image/icons/maximize.svg" alt="back"></button>
                </div>
            </div>
            

            <main>
                <main>
                    <filter-section .categoryList="${this.categoryList}" @filter-changed="${this._handelFilterChanged}"></filter-section>
                    <showcase-section 
                        overviewType="${this.currentPath}"
                        .productList="${this.productList}"
                        .filterRequest="${this.filterRequest}"
                        @filter-deleted="${this._handelFilterDeleted}"
                    >
                    </showcase-section>
                </main>
            </main>
        `;
    }

    private _handelFilterDeleted(): void {
        const filterSection: FilterSection | undefined | Element | null = this.shadowRoot!.querySelector("filter-section");
        if (filterSection && filterSection instanceof FilterSection) {
            filterSection.clearFilter();
            filterSection.updateFilter();
        }
    }

    private _handelFilterChanged(event: CustomEvent): void {
        this.filterRequest = event.detail.message;
        const showcaseSection: ShowcaseSection | undefined | Element | null = this.shadowRoot!.querySelector("showcase-section");
        if (showcaseSection && showcaseSection instanceof ShowcaseSection) {
            showcaseSection.updateFilterRequest(this.filterRequest);
        }
    }

}