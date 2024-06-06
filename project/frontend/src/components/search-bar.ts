import {html, LitElement, TemplateResult} from "lit";
import {customElement} from "lit/decorators.js";
import searchBarStyle from "../styles/searchBarStyle";
import {ProductSearchResponse} from "../types/product/ProductSearchResponse";
import {ProductService} from "../services/ProductService";
import {navigateTo} from "./router";


@customElement("search-bar")
export class SearchBar extends LitElement {
    private searchResultsVisible: boolean = false;
    private searchResults: ProductSearchResponse[] | undefined;

    private async handleInputChange(event: Event): Promise<void> {
        const inputValue: string = (event.target as HTMLInputElement).value;
        this.searchResultsVisible = inputValue.trim().length > 0;
        if (this.searchResultsVisible) {
            this.searchResults = await this.fetchProducts(inputValue);
        }
        this.requestUpdate();
    }

    private handleKeyDown(event: KeyboardEvent): void {
        if (event.key === 'Enter') {
            this.handleSearchButtonClick();
        }
    }

    private async fetchProducts(query: string): Promise<ProductSearchResponse[] | undefined> {
        const productService: ProductService = new ProductService();
        return await productService.searchProducts(query);
    }

    private redirectToDetailPage(id: number): void{
        this.clearSearch();
        navigateTo(`/product-detail-page/${id}`)
        this.requestUpdate();
    }

    private redirectToQueryResults(query: string): void {
        this.clearSearch();
        navigateTo(`/search/${query}`);
        this.requestUpdate();
    }

    private handleSearchButtonClick(): void {
        const inputElement = this.shadowRoot?.querySelector('input[type="text"]') as HTMLInputElement;
        if (inputElement) {
            const query = inputElement.value.trim();
            if (query) {
                this.redirectToQueryResults(query);
            }
        }
    }

    private clearSearch(): void {
        const inputElement = this.shadowRoot?.querySelector('input[type="text"]') as HTMLInputElement;
        if (inputElement) {
            inputElement.value = '';
        }
        this.searchResultsVisible = false;
        this.searchResults = [];
    }

    public static styles = [searchBarStyle];

    public render(): TemplateResult {
        return html`
            <div class="search-bar">
                <div class="search-input">
                    <input
                        type="text"
                        placeholder="Search..."
                        @input="${this.handleInputChange}"
                        @keydown="${this.handleKeyDown}"
                    />
                    <img @click="${this.handleSearchButtonClick}" class="icon search-icon" src="../assets/image/icons/search-icon.svg" alt="search button">
                </div>
                <div class="search-result">
                    ${this.searchResultsVisible ? this.searchResults?.map(result => html`
                        <div class="result" @click="${() => this.redirectToDetailPage(result.id)}">
                            <span>${result.name}</span>
                            <img class="redirect-icon" src="../assets/image/icons/redirect-icon.svg" alt="redirect button">
                        </div>
                    `) : ""}
                </div>
            </div>
        `;
    }
}