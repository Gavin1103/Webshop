import {html, LitElement, TemplateResult} from "lit";
import {customElement} from "lit/decorators.js";
import filterSectionStyle from "../../../styles/productsOverview/filterSectionStyle";

@customElement("filter-section")
export class FilterSection extends LitElement {
    private categoryVisible: boolean = true;
    private categoryIconSrc: string = "/assets/image/icons/minus-circle.svg";

    private toggleCategory(): void{
        this.categoryVisible = !this.categoryVisible;
        if (!this.categoryVisible) {
            this.categoryIconSrc = "/assets/image/icons/plus-circle.svg";
        } else {
            this.categoryIconSrc = "/assets/image/icons/minus-circle.svg";
        }
        this.requestUpdate();
    }

    public static styles = [filterSectionStyle];


    public render():TemplateResult {
        return html`
            <div class="header">
                <span tabindex="1" class="header-back-button">Back</span>
            </div>
                
            <section class="filter-section">
                <div class="category">
                    <span >Categories</span>
                    <img 
                        tabindex="1" 
                        @click="${this.toggleCategory}" 
                        src="${this.categoryIconSrc}" alt="Toggle category"
                    >
                    <ul class="category-checkbox" style="${this.categoryVisible ? "" : "display: none;"}">
                        <li><input type="checkbox" id="checkbox1" name="checkbox1"><label for="checkbox1">option 1</label></li>
                        <li><input type="checkbox" id="checkbox1" name="checkbox1"><label for="checkbox1">option 1</label></li>
                        <li><input type="checkbox" id="checkbox1" name="checkbox1"><label for="checkbox1">option 1</label></li>
                    </ul>
                </div>
                
            </section>
        `;
    }
}