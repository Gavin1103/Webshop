import {html, LitElement, TemplateResult} from "lit";
import {customElement} from "lit/decorators.js";
import overviewStyle from "../../../styles/productsOverview/overviewStyle";

@customElement("products-overview")
export class ProductsOverview extends LitElement {

    public static styles = [overviewStyle];

    public render():TemplateResult {
        return html`
            <filter-section></filter-section>
        `;
    }
}