import {html, LitElement, TemplateResult} from "lit";
import {customElement} from "lit/decorators.js";
import searchStyle from "../../../../styles/cms/product/searchStyle";
import {Product} from "../../../../types/product/Product";
import {ProductService} from "../../../../services/ProductService";

@customElement("cms-search")
export class CmsSearch extends LitElement {
    public static styles = [searchStyle];

    private searchResult: Product[] | undefined;

    private async handleInputChange(event: Event): Promise<void> {
        const inputValue: string = (event.target as HTMLInputElement).value;

        const productService: ProductService = new ProductService();
        this.searchResult = await productService.searchProducts(inputValue) as Product[];

        this.dispatchEvent(new CustomEvent('search-result', {
            detail: {products: this.searchResult},
            bubbles: true,
            composed: true
        }));
        this.requestUpdate();
    }


    public render(): TemplateResult {
        return html`
            <div class="search-bar">
                <div class="search-input">
                    <img class="icon search-icon" src="../assets/image/icons/search-icon.svg"
                         alt="search button">
                    <input
                        @input="${this.handleInputChange}"
                        type="text"
                        placeholder="Search..."

                    />
                </div>
            </div>
        `;
    }
}