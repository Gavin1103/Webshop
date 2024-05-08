import {html, LitElement, TemplateResult} from "lit";
import {customElement} from "lit/decorators.js";
import searchBarStyle from "../styles/searchBarStyle";


@customElement("search-bar")
export class SearchBar extends LitElement {
    private searchResultsVisible: boolean = false;

    private handleInputChange(event: Event): void {
        const inputValue: string = (event.target as HTMLInputElement).value;
        this.searchResultsVisible = inputValue.trim().length > 0;
        this.requestUpdate();
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
                    />
                    <img class="icon search-icon" src="../assets/image/icons/search-icon.svg" alt="search button">
                </div>
                ${this.searchResultsVisible ? html`
                <div class="search-result">
                    <div class="result">
                        <span>hello</span>
                        <img class="redirect-icon" src="../assets/image/icons/redirect-icon.svg" alt="redirect-button">
                    </div>

                    <div class="result">
                        <span>hello php</span>
                        <img class="redirect-icon" src="../assets/image/icons/redirect-icon.svg" alt="redirect-button">
                    </div>
                    
                </div>` : ""}
            </div>
        `;
    }
}