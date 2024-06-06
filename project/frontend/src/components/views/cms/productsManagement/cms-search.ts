import {html, LitElement, TemplateResult} from "lit";
import {customElement} from "lit/decorators.js";
import searchStyle from "../../../../styles/cms/product/searchStyle";

@customElement("cms-search")
export class CmsSearch extends LitElement {
    public static styles = [searchStyle];

    public render(): TemplateResult {
        return html`
            <div class="search-bar">
                <div class="search-input">
                    <img class="icon search-icon" src="../assets/image/icons/search-icon.svg"
                         alt="search button">
                    <input
                        type="text"
                        placeholder="Search..."

                    />
                </div>
            </div>
        `;
    }
}