import {html, LitElement, TemplateResult} from "lit";
import {customElement} from "lit/decorators.js";
import overviewStyle from "../../../styles/productsOverview/overviewStyle";
import {Router} from "@vaadin/router";
import {getCurrentPath} from "../../router";
import {OverviewType} from "./enum/OverviewType";
import {FilterRequest} from "./type/FilterRequest";
import {ShowcaseSection} from "./showcaseSection";


@customElement("products-overview")
export class ProductsOverview extends LitElement {
    private categoryList: {name: string}[] = [
        {name: "Games"},
        {name: "Books"},
        {name: "Electronic"},
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

    public static styles = [overviewStyle];


    public render():TemplateResult {
        return html`
            <div class="header">
                <img src="/assets/image/icons/chevron-left.svg" alt="back">
                <button @click="${this.redirectToPreviousPage}" class="header-back-button">Back</button>
            </div>
            

            <main>
                <main>
                    <filter-section .categoryList="${this.categoryList}" @filter-changed="${this._handelFilterChanged}"></filter-section>
                    <showcase-section 
                        overviewType="${this.currentPath}"
                        .filterRequest="${this.filterRequest}">
                    </showcase-section>
                </main>
            </main>
        `;
    }

    private _handelFilterChanged(event: CustomEvent): void {
        this.filterRequest = event.detail.message;
        const showcaseSection: ShowcaseSection | undefined | Element | null = this.shadowRoot!.querySelector("showcase-section");
        if (showcaseSection && showcaseSection instanceof ShowcaseSection) {
            showcaseSection.updateFilterRequest(this.filterRequest);
        }
    }

}