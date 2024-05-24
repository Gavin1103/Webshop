import {html, LitElement, TemplateResult} from "lit";
import {customElement} from "lit/decorators.js";
import overviewStyle from "../../../styles/productsOverview/overviewStyle";
import {getCurrentPath} from "../../router";
import {OverviewType} from "../../../enums/overviewPage/OverviewType";
import {FilterRequest} from "../../../types/overviewPage/FilterRequest";
import {ShowcaseSection} from "./showcaseSection";
import {ProductOverviewResponse} from "../../../types/ProductOverviewResponse";
import {FilterSection} from "./filterSection";
import {ProductService} from "../../../services/ProductService";
import {Router} from "@vaadin/router";


@customElement("products-overview")
export class ProductsOverview extends LitElement {
    private categoryList: {name: string}[] = [];

    private productList: ProductOverviewResponse | undefined;

    private overviewType: OverviewType | undefined;
    private param: string | undefined;

    public filterRequest: FilterRequest | undefined;



    public connectedCallback(): void {
        super.connectedCallback();
        this.updateCurrentPath();
        this.requestUpdate();
    }


    private async loadProducts(): Promise<void> {
        const productService: ProductService = new ProductService();
        if (this.filterRequest) {
            if (this.overviewType == OverviewType.category) {
                this.productList = await productService.getFilteredProduct(this.filterRequest, this.param);
            }
            this.requestUpdate();
            console.log(this.productList);
        }
    }



    private updateCurrentPath = (): void => {
        const parts: string[] = getCurrentPath().split("/");
        this.overviewType = parts[1] as OverviewType;
        this.param = parts[2];
        switch (this.overviewType) {
            case OverviewType.category:
                this.categoryList.push({name: this.param});
        }
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
                    <filter-section 
                        .categoryList="${this.categoryList}"
                        @filter-changed="${this._handelFilterChanged}">
                        
                    </filter-section>
                    <showcase-section 
                        overviewType="${this.overviewType}"
                        .productList="${this.productList}"
                        .filterRequest="${this.filterRequest}"
                        .param="${this.param}"
                        @filter-deleted="${this._handelFilterDeleted}"
                    >
                    </showcase-section>
                </main>
            </main>
        `;
    }

    private async _handelFilterDeleted(): Promise<void> {
        const filterSection: FilterSection | undefined | Element | null = this.shadowRoot!.querySelector("filter-section");

        //Refresh the product list
        const storedFilterRequest: string | null = sessionStorage.getItem("filterRequest");
        if (storedFilterRequest) {
            this.filterRequest = JSON.parse(storedFilterRequest);
            await this.loadProducts();
        }

        // refresh the filter
        if (filterSection && filterSection instanceof FilterSection) {
            filterSection.clearFilter();
            filterSection.updateFilter();
        }
    }

    private async _handelFilterChanged(event: CustomEvent): Promise<void> {
        this.filterRequest = event.detail.message;
        await this.loadProducts();
        const showcaseSection: ShowcaseSection | undefined | Element | null = this.shadowRoot!.querySelector("showcase-section");
        if (showcaseSection && showcaseSection instanceof ShowcaseSection) {
            showcaseSection.updateFilterRequest(this.filterRequest);
        }
    }

}