import {html, LitElement, TemplateResult} from "lit";
import {customElement} from "lit/decorators.js";
import overviewStyle from "../../../styles/productsOverview/overviewStyle";
import {Router, Context} from "@vaadin/router";


@customElement("products-overview")
export class ProductsOverview extends LitElement {
    private categoryList: {name: string}[] = [
        {name: "category 1"},
        {name: "category 2"},
        {name: "category 3"},
    ];

    private static currentPage: string | undefined;

    public static beforeEnter(context: Context): void {
        const pathParts: string[] = context.pathname.split("/");
        ProductsOverview.currentPage = pathParts[1];
    }



    private redirectToPreviousPage(): void {
        Router.go("/home");
    }

    public static styles = [overviewStyle];


    public render():TemplateResult {
        return html`
            <div class="header">
                <img src="/assets/image/icons/chevron-left.svg" alt="back">
                <button @click="${this.redirectToPreviousPage}" class="header-back-button">Back</button>
            </div>
            
            
            <main>
                <filter-section .categoryList="${this.categoryList}"></filter-section>
                <showcase-section overviewType="${ProductsOverview.currentPage}"></showcase-section> 
            </main>
        `;
    }

}