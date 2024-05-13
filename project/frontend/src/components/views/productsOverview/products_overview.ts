import {html, LitElement, TemplateResult} from "lit";
import {customElement} from "lit/decorators.js";
import overviewStyle from "../../../styles/productsOverview/overviewStyle";

@customElement("products-overview")
export class ProductsOverview extends LitElement {
    private categoryList: {name: string}[] = [
        {name: "category 1"},
        {name: "category 2"},
        {name: "category 3"},
    ];

    public static styles = [overviewStyle];

    public render():TemplateResult {
        return html`
            <filter-section .categoryList="${this.categoryList}"></filter-section>
            <h1>products</h1>
        `;
    }
}