import {css, html, LitElement, TemplateResult} from "lit";
import {customElement} from "lit/decorators.js";


@customElement("search-bar")
export class SearchBar extends LitElement {
    private searchResultsVisible: boolean = false;

    private handleInputChange(event: Event): void {
        const inputValue: string = (event.target as HTMLInputElement).value;
        this.searchResultsVisible = inputValue.trim().length > 0;
        this.requestUpdate();
    }

    public static styles = css`
        .search-bar {
            display: flex;
            flex-direction: column;
        }

        .search-input {
            display: flex;
            min-width: 300px;
            align-items: center;
            justify-content: space-between;
            border-radius: 50px;
            margin: 5px 0;
            background: rgba(180, 180, 180, 0.6);
            backdrop-filter: blur(10px);
            transition: transform 0.3s ease;

            input[type="text"] {
                border: none;
                outline: none;
                background: none;
                width: 100%;
                height: 100%;
                font-size: large;
                padding: 0 20px;
            }
        }

        .search-input:hover {
            transform: scale(1.03);
        }

        .search-result {
            position: absolute;
            border-radius: 0 0 10px 10px;
            top: 10vh;
            width: 100%;
            max-width: 300px;
            max-height: 30vh;
            overflow-y: auto;
            z-index: 999;
            background: #FFFFFF;
            box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
        }

        .result {
            display: flex;
            justify-content: space-between;
            padding: 10px;
            font-size: large;
            transition: transform 0.3s ease, background 0.8s ease;
        }

        .result:hover {
            background: #D9D9D9;
            transform: scale(1.05);

            .redirect-icon {
                display: block;
            }
        }

        .redirect-icon {
            transition: transform 0.3s ease;
            display: none;
        }

        .redirect-icon:hover {
            transform: scale(1.1);
        }

        .icon {
            width: 40px;
            height: 40px;
            padding: 0 5px;
            transition: transform 0.3s ease;
        }

        .icon:hover {
            transform: scale(1.1);
        }


        @media screen and (max-width: 600px) {
            .icon {
                width: auto;
                height: 35px;
                padding: 0 5px;
            }
        }
    `;

    public render(): TemplateResult {
        return html`
            <div class="search-bar">
                <div class="search-input">
                    <input
                        type="text"
                        placeholder="Search..."
                        @input="${this.handleInputChange}"
                    />
                    <svg
                        class="icon search-icon"
                        xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                </div>
                ${this.searchResultsVisible ? html`
                <div class="search-result">
                    <div class="result">
                        <span>hello</span>
                        <svg
                            class="redirect-icon"
                            xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17l9.2-9.2M17 17V7H7"/>
                        </svg>
                    </div>

                    <div class="result">
                        <span>hello php</span>
                        <svg
                            class="redirect-icon"
                            xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17l9.2-9.2M17 17V7H7"/>
                        </svg>
                    </div>
                    
                </div>` : ""}
            </div>
        `;
    }
}