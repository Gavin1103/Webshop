import {html, LitElement, TemplateResult} from "lit";
import {customElement, property} from "lit/decorators.js";
import categoryGridSectionStyle from "../../../styles/homePage/categoryGridSectionStyle";
import {Category} from "../../../../types/responses/Category";

@customElement("category-grid-section")
export class CategoryGridSection extends LitElement {
    @property({type: Array})
    public categoryList: Category[] | undefined;

    public static styles = [categoryGridSectionStyle];

    public render(): TemplateResult {
        return html `
            <div class="header-container">
                <Span class="header-text">Categories</Span>
            </div>
            <section class="category-grid">
                ${this.categoryList ? this.categoryList.map(category => html`
                    <div class="category-card">
                        <img class="category-image" src="${category.image}" alt="${category.name}">
                        <div class="more-info-button">
                            <span tabindex="1" class="category-name">${category.name}</span>
                        </div>
                    </div>
                `) : ""}
            </section>
            
        `;
    }
}